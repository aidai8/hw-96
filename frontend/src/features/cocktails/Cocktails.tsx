import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchCocktails} from './cocktailsThunks';
import {selectCocktails, selectCocktailsLoading} from './cocktailsSlice';
import {Button, CircularProgress, Typography} from '@mui/material';
import Grid from "@mui/material/Grid2";
import {Link} from 'react-router-dom';
import {selectUser} from '../users/usersSlice';
import CocktailItem from "./CocktailItem.tsx";

const Cocktails = () => {
    const dispatch = useAppDispatch();
    const cocktails = useAppSelector(selectCocktails);
    const loading = useAppSelector(selectCocktailsLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchCocktails());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress/>;
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid>
                    <Typography variant="h4">Cocktails</Typography>
                </Grid>
                {user && (
                    <Grid>
                        <Button component={Link} to="/cocktails/new" variant="contained" color="secondary">
                            Add new cocktail
                        </Button>
                    </Grid>
                )}
            </Grid>
            <Grid container spacing={3}>
                {cocktails.map(cocktail => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={cocktail._id}>
                        <CocktailItem cocktail={cocktail}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Cocktails;