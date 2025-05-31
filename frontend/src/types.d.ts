export interface RegisterMutation {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
    avatar?: File | null;
}

export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string;
    googleID?: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface Ingredient {
    name: string;
    amount: string;
}

export interface Cocktail {
    _id: string;
    user: User;
    name: string;
    image: string;
    recipe: string;
    isPublished: boolean;
    ingredients: Ingredient[];
}

export interface CocktailMutation {
    name: string;
    recipe: string;
    ingredients: Ingredient[];
    image: File | null;
}