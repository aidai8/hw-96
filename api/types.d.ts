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