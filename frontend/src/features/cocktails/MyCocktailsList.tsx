import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchMyCocktails} from './cocktailsThunks';
import {selectMyCocktails, selectCocktailsLoading, selectCocktailsError} from './cocktailsSlice';
import CocktailItem from './CocktailItem';
import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import Grid from "@mui/material/Grid2";
import {Link} from 'react-router-dom';

const MyCocktailsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectMyCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const error = useAppSelector(selectCocktailsError);

    useEffect(() => {
        dispatch(fetchMyCocktails());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">My Cocktails</Typography>
                <Button
                    component={Link}
                    to="/cocktails/new"
                    variant="contained"
                    color="primary"
                >
                    Add New Cocktail
                </Button>
            </Box>

            {cocktails.length === 0 ? (
                <Typography>You haven't created any cocktails yet</Typography>
            ) : (
                <Grid container spacing={3}>
                    {cocktails.map((cocktail) => (
                        <Grid size={{xs: 12, sm: 6, md: 4}} key={cocktail._id}>
                            <CocktailItem
                                cocktail={cocktail}
                                showStatus
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default MyCocktailsList;