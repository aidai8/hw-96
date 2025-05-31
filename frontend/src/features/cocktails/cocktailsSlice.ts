import {createSlice} from "@reduxjs/toolkit";
import {Cocktail} from "../../types";
import {RootState} from "../../app/store";
import {fetchCocktails, fetchMyCocktails, createCocktail} from "./cocktailsThunks";

interface CocktailsState {
    items: Cocktail[];
    myCocktails: Cocktail[];
    loading: boolean;
    createLoading: boolean;
    error: boolean | string;
}

const initialState: CocktailsState = {
    items: [],
    myCocktails: [],
    loading: false,
    createLoading: false,
    error: false,
};

const cocktailsSlice = createSlice({
    name: 'cocktails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCocktails.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchCocktails.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.items = payload;
        });
        builder.addCase(fetchCocktails.rejected, (state, {error}) => {
            state.loading = false;
            state.error = error.message || true;
        });

        builder.addCase(fetchMyCocktails.pending, (state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(fetchMyCocktails.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.myCocktails = payload;
        });
        builder.addCase(fetchMyCocktails.rejected, (state, {error}) => {
            state.loading = false;
            state.error = error.message || true;
        });

        builder.addCase(createCocktail.pending, (state) => {
            state.createLoading = true;
            state.error = false;
        });
        builder.addCase(createCocktail.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createCocktail.rejected, (state, {error}) => {
            state.createLoading = false;
            state.error = error.message || true;
        });
    },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectMyCocktails = (state: RootState) => state.cocktails.myCocktails;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.loading;
export const selectCocktailCreateLoading = (state: RootState) => state.cocktails.createLoading;
export const selectCocktailsError = (state: RootState) => state.cocktails.error;