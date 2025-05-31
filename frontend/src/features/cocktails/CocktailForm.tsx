import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FileInput from "../../components/UI/FileInput/FileInput";
import {CocktailMutation} from "../../types";

interface Props {
    onSubmit: (cocktail: CocktailMutation) => void;
    loading: boolean;
}

const CocktailForm: React.FC<Props> = ({onSubmit, loading}) => {
    const [state, setState] = useState<CocktailMutation>({
        name: '',
        recipe: '',
        ingredients: [{name: '', amount: ''}],
        image: null,
    });

    const addIngredient = () => {
        setState(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, {name: '', amount: ''}]
        }));
    };

    const removeIngredient = (index: number) => {
        setState(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const ingredientChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {name, value} = e.target;
        setState(prev => {
            const ingredients = [...prev.ingredients];
            ingredients[index] = {...ingredients[index], [name]: value};
            return {...prev, ingredients};
        });
    };

    const fileInputChangeHandler = (file: File | null) => {
        setState(prev => ({...prev, image: file}));
    };

    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid size={{xs: 12}}>
                    <TextField
                        required
                        label="Name"
                        name="name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextField
                        required
                        label="Recipe"
                        name="recipe"
                        value={state.recipe}
                        onChange={inputChangeHandler}
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <FileInput
                        label="Image"
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                {state.ingredients.map((ingredient, index) => (
                    <Grid container spacing={2} key={index} alignItems="center">
                        <Grid size={{xs: 5}}>
                            <TextField
                                required
                                label="Ingredient name"
                                name="name"
                                value={ingredient.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => ingredientChangeHandler(e, index)}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xs: 5}}>
                            <TextField
                                required
                                label="Amount"
                                name="amount"
                                value={ingredient.amount}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => ingredientChangeHandler(e, index)}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{xs: 2}}>
                            <Button
                                type="button"
                                color="error"
                                onClick={() => removeIngredient(index)}
                                disabled={state.ingredients.length <= 1}
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                ))}

                <Grid>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={addIngredient}
                    >
                        Add Ingredient
                    </Button>
                </Grid>

                <Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Create'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CocktailForm;