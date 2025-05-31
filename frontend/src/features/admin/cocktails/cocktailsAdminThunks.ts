import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../../axiosApi";
import {Cocktail} from "../../../types";

export const fetchUnpublishedCocktails = createAsyncThunk<Cocktail[]>(
    'cocktailsAdmin/fetchUnpublished',
    async () => {
        const response = await axiosApi.get<Cocktail[]>('/admin/cocktails/unpublished');
        return response.data;
    }
);

export const publishCocktail = createAsyncThunk<void, string>(
    'cocktailsAdmin/publish',
    async (cocktailId) => {
        await axiosApi.patch(`/cocktails/${cocktailId}/publish`);
    }
);

export const deleteCocktail = createAsyncThunk<void, string>(
    'cocktailsAdmin/delete',
    async (cocktailId) => {
        await axiosApi.delete(`/cocktails/${cocktailId}`);
    }
);