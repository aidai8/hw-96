import React from "react";
import {Card, CardContent, CardMedia, Typography, Chip, Button} from "@mui/material";
import {Cocktail} from "../../types";
import {apiUrl} from "../../../globalConstants.ts";


interface Props {
    cocktail: Cocktail;
    onPublish?: () => void;
    showStatus?: boolean;
    onDelete?: () => void;
    showActions?: boolean;
}

const CocktailItem: React.FC<Props> = ({cocktail, onPublish, onDelete, showActions = false, showStatus = false}) => {
    const imageUrl = cocktail.image ? apiUrl + cocktail.image : '';

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            {imageUrl && (
                <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt={cocktail.name}
                />
            )}
            <CardContent sx={{flexGrow: 1}}>
                {showStatus && (
                    <Chip
                        label={cocktail.isPublished ? 'Published' : 'Pending'}
                        color={cocktail.isPublished ? 'success' : 'warning'}
                        sx={{mb: 1}}
                    />
                )}
                <Typography gutterBottom variant="h5" component="div">
                    {cocktail.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {cocktail.recipe}
                </Typography>
                <Typography variant="subtitle2" mt={2}>
                    Ingredients:
                </Typography>
                <ul>
                    {cocktail.ingredients.map((ingredient, idx) => (
                        <li key={idx}>
                            {ingredient.name} - {ingredient.amount}
                        </li>
                    ))}
                </ul>
                {showActions && (
                    <div style={{ marginTop: '16px' }}>
                        {onPublish && !cocktail.isPublished && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={onPublish}
                                sx={{ mr: 1 }}
                            >
                                Publish
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={onDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default CocktailItem;