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
        this.Authorization = `Bearer ${jwt}`
    }
}
