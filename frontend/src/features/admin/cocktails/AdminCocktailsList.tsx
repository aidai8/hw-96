import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {fetchUnpublishedCocktails, publishCocktail, deleteCocktail} from "./cocktailsAdminThunks";
import {selectAdminCocktails, selectAdminCocktailsLoading} from "./cocktailsAdminSlice";
import CocktailItem from "../../cocktails/CocktailItem";
import {CircularProgress, Typography} from "@mui/material";


const AdminProductsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectAdminCocktails);
    const loading = useAppSelector(selectAdminCocktailsLoading);

    useEffect(() => {
        dispatch(fetchUnpublishedCocktails());
    }, [dispatch]);

    const handlePublish = async (id: string) => {
        await dispatch(publishCocktail(id)).unwrap();
        dispatch(fetchUnpublishedCocktails());
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteCocktail(id)).unwrap();
        dispatch(fetchUnpublishedCocktails());
    };

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Unpublished Cocktails</Typography>
            {cocktails.length === 0 ? (
                <Typography>No unpublished cocktails</Typography>
            ) : (
                <div>
                    {cocktails.map(cocktail => (
                        <CocktailItem
                            key={cocktail._id}
                            cocktail={cocktail}
                            onPublish={() => handlePublish(cocktail._id)}
                            onDelete={() => handleDelete(cocktail._id)}
                            showActions
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminProductsList;