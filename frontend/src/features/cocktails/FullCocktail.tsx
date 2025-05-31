import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosApi from "../../axiosApi";
import {Cocktail} from "../../types";
import {Box, CircularProgress, Typography} from "@mui/material";
import CocktailItem from "./CocktailItem";

const FullCocktail: React.FC = () => {
    const {id} = useParams();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCocktail = async () => {
            try {
                const response = await axiosApi.get<Cocktail>(`/cocktails/${id}`);
                setCocktail(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCocktail();
    }, [id]);

    if (loading) {
        return <CircularProgress/>;
    }

    if (!cocktail) {
        return <Typography variant="h4">Cocktail not found</Typography>;
    }

    return (
        <Box>
            <Typography variant="h2" gutterBottom>{cocktail.name}</Typography>
            <CocktailItem cocktail={cocktail}/>
        </Box>
    );
};

export default FullCocktail;