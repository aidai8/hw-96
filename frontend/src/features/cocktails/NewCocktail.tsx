import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createCocktail} from "./cocktailsThunks";
import CocktailForm from "./CocktailForm";
import {useNavigate} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import {CocktailMutation} from "../../types";
import {selectCocktailCreateLoading} from "./cocktailsSlice.ts";
import {toast} from "react-toastify";
import {selectUser} from "../users/usersSlice.ts";

const NewCocktail: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const loading = useAppSelector(selectCocktailCreateLoading);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const onFormSubmit = async (cocktail: CocktailMutation) => {
        try {
            const { message } = await dispatch(createCocktail(cocktail)).unwrap();
            toast.success(message);
            navigate('/my-cocktails');
        } catch (e) {
            const error = e as Error;
            toast.error(error.message || 'Failed to create cocktail');
            console.error('Creation error:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>New Cocktail</Typography>
            <CocktailForm onSubmit={onFormSubmit} loading={loading} />
        </Container>
    );
};

export default NewCocktail;