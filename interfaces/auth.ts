export type UserCredentials = {
    email: string;
    password: string;
}

export type Token = {
    token: string;
}

export class AuthorizationHeader {
    Authorization: string;

    constructor (jwt: string) {
        this.Authorization = `Bearer ${jwt}`;
    }
}

export interface NameDetails {
    first: string;
    last: string;
}

export type User = {
    name: NameDetails;
    email: string;
    iat: number;
    exp: number;
}

export type UserProps = {
    user: User;
}

export type PasswordResetProps = {
    passwordResetId: string;
}

export type PasswordResetQuery = {
    id: string;
}

export type ChangePasswordDto = {
    passwordResetId: string;
    password: string;
    confirmPassword: string;
}