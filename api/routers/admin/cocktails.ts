import express from 'express';
import Cocktail from "../../models/Cocktail";

const cocktailAdminRouter = express.Router();

cocktailAdminRouter.get('/unpublished', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.find({isPublished: false}).populate('user', 'displayName avatar');
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

export default cocktailAdminRouter;