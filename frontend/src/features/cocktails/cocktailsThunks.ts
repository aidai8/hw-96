import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {Cocktail, CocktailMutation} from "../../types";

export const fetchCocktails = createAsyncThunk<Cocktail[]>(
    'cocktails/fetchAll',
    async () => {
        const response = await axiosApi.get<Cocktail[]>('/cocktails');
        return response.data;
    }
);

export const fetchMyCocktails = createAsyncThunk<Cocktail[]>(
    'cocktails/fetchMy',
    async () => {
        const response = await axiosApi.get<Cocktail[]>('/cocktails/my');
        return response.data;
    }
);

export const createCocktail = createAsyncThunk<{ message: string }, CocktailMutation>(
    'cocktails/create',
    async (cocktailMutation) => {
        const formData = new FormData();
        console.log('Creating cocktail with data:', cocktailMutation);

        formData.append('name', cocktailMutation.name);
        formData.append('recipe', cocktailMutation.recipe);
        formData.append('ingredients', JSON.stringify(cocktailMutation.ingredients));

        if (cocktailMutation.image) {
            formData.append('image', cocktailMutation.image);
            console.log('Image file:', cocktailMutation.image);
        } else {
            console.log('No image provided');
        }

        const response = await axiosApi.post('/cocktails', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
);