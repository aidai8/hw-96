import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";
import {Cocktail} from "../../../types";
import {fetchUnpublishedCocktails, publishCocktail, deleteCocktail} from "./cocktailsAdminThunks";

interface CocktailsAdminState {
    items: Cocktail[];
    loading: boolean;
    publishLoading: boolean;
    deleteLoading: boolean;
    error: boolean | string;
}

const initialState: CocktailsAdminState = {
    items: [],
    loading: false,
    publishLoading: false,
    deleteLoading: false,
    error: false,
};

const cocktailsAdminSlice = createSlice({
    name: 'cocktailsAdmin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUnpublishedCocktails.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchUnpublishedCocktails.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.items = payload;
        });
        builder.addCase(fetchUnpublishedCocktails.rejected, (state, {error}) => {
            state.loading = false;
            state.error = error.message || true;
        });

        builder.addCase(publishCocktail.pending, (state) => {
            state.publishLoading = true;
            state.error = false;
        });
        builder.addCase(publishCocktail.fulfilled, (state) => {
            state.publishLoading = false;
        });
        builder.addCase(publishCocktail.rejected, (state, {error}) => {
            state.publishLoading = false;
            state.error = error.message || true;
        });

        builder.addCase(deleteCocktail.pending, (state) => {
            state.deleteLoading = false;
            state.error = false;
        });
        builder.addCase(deleteCocktail.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteCocktail.rejected, (state, {error}) => {
            state.deleteLoading = false;
            state.error = error.message || true;
        });
    },
});

export const cocktailsAdminReducer = cocktailsAdminSlice.reducer;

export const selectAdminCocktails = (state: RootState) => state.cocktailsAdmin.items;
export const selectAdminCocktailsLoading = (state: RootState) => state.cocktailsAdmin.loading;
export const selectPublishLoading = (state: RootState) => state.cocktailsAdmin.publishLoading;
export const selectDeleteLoading = (state: RootState) => state.cocktailsAdmin.deleteLoading;
export const selectAdminCocktailsError = (state: RootState) => state.cocktailsAdmin.error;