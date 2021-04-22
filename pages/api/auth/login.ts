import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponse, UnsupportedMethodError } from '../../../interfaces/http';
import usersService from '../../../services/users';
import { formatErrorResponse, formatHttpResponse } from '../../../libs/api';
import { setJwtCookie } from '../../../libs/cookie';
import jwtDecode from 'jwt-decode';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== 'POST') throw new UnsupportedMethodError(req.method);
        const response = await usersService.login(req.body.email, req.body.password);
        setJwtCookie(res, response.data);
        formatHttpResponse(res, response.status, new HttpResponse(response.status, jwtDecode(response.data)));
    } catch (err) {
        formatErrorResponse(res, err);
    }
};
