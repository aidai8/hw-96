import mongoose, {Schema, Types} from 'mongoose';
import {UserFields} from '../types';

export interface Ingredient {
    name: string;
    amount: string;
}

export interface CocktailFields {
    user: Types.ObjectId | UserFields;
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: Ingredient[];
}

const CocktailSchema = new Schema<CocktailFields>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    ingredients: [{
        name: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        }
    }]
});

const Cocktail = mongoose.model<CocktailFields>('Cocktail', CocktailSchema);
export default Cocktail;