import { NextApiRequest, NextApiResponse } from 'next';
import { HttpResponse, UnsupportedMethodError } from '../../../interfaces/http';
import { formatErrorResponse, formatHttpResponse } from '../../../libs/api';
import { expireJwtCookie } from '../../../libs/cookie';
import { StatusCodes } from 'http-status-codes';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== 'POST') throw new UnsupportedMethodError(req.method);
        expireJwtCookie(res);
        formatHttpResponse(res, StatusCodes.OK, new HttpResponse(StatusCodes.OK, 'User logged out'));
    } catch (err) {
        formatErrorResponse(res, err);
    }
};
