import { NextApiResponse } from "next"
import { CookieSerializeOptions, serialize, } from 'cookie';
import { decode } from "jsonwebtoken";

export const setJwtCookie = (
    res: NextApiResponse,
    jwt: string,
): void => {
    const MILLISECONDS_IN_A_SECOND = 1000;
    const expiryTime = decode(jwt)['exp'] * MILLISECONDS_IN_A_SECOND;
    const jwtCookie = serialize('jwt', jwt, { 
        sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
        httpOnly: true,
        expires: new Date(expiryTime),
        path: '/',
    } as CookieSerializeOptions);
    res.setHeader('Set-Cookie', jwtCookie);
}
  
