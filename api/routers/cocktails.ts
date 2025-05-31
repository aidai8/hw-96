import express from 'express';
import {imagesUpload} from '../middleware/multer';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import Cocktail from '../models/Cocktail';
import mongoose from 'mongoose';

const cocktailsRouter = express.Router();

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!req.body.name || !req.body.recipe || !req.body.ingredients) {
            res.status(400).send({error: 'Name, recipe and ingredients are required'});
            return;
        }

        const ingredients = JSON.parse(req.body.ingredients);

        if (!Array.isArray(ingredients)) {
            res.status(400).send({error: 'Ingredients must be an array'});
            return;
        }

        const cocktail = new Cocktail({
            user: user._id,
            name: req.body.name,
            recipe: req.body.recipe,
            ingredients: ingredients,
            image: req.file ? '/images/' + req.file.filename : null,
        });

        await cocktail.save();
        res.send({
            message: 'Your cocktail is under moderator review',
            cocktail
        });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

cocktailsRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const isAdmin = user.role === 'admin';

        const query = isAdmin ? {} : {$or: [{isPublished: true}, {user: user._id}]};

        const cocktails = await Cocktail.find(query).populate('user', 'displayName avatar');
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.get('/my', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const cocktails = await Cocktail.find({user: user._id}).populate('user', 'displayName avatar');
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.patch('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findByIdAndUpdate(
            req.params.id,
            {isPublished: true},
            {new: true}
        );

        if (!cocktail) {
            res.status(404).send({error: 'Cocktail not found'});
            return;
        }

        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findByIdAndDelete(req.params.id);

        if (!cocktail) {
            res.status(404).send({error: 'Cocktail not found'});
            return;
        }

        res.send({message: 'Cocktail deleted successfully'});
    } catch (e) {
        next(e);
    }
});

export default cocktailsRouter;