export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    avatar: string;
    displayName: string;
    googleID?: string;
    __confirmPassword: string;
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