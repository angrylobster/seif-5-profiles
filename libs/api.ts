import { parse } from 'cookie';
import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiResponse } from 'next';
import { HttpBackendError } from '../interfaces/http';
import { ServerResponse } from 'http';
import { getReasonPhrase } from 'http-status-codes';
import jwtDecode from 'jwt-decode';

export const formatHttpResponse = (res: NextApiResponse, status: number, body: unknown): void => {
    res.status(status)
        .json(body);
};

export const formatErrorResponse = (res: NextApiResponse, err: Error): void => {
    const DEFAULT_ERROR_STATUS = 500;
    const status = (err as HttpBackendError).status || DEFAULT_ERROR_STATUS;
    const error = getReasonPhrase(status);
    const data = (err as HttpBackendError).data || err.message;
    formatHttpResponse(res, status, new HttpBackendError(status, error, data));
};

export const sendRedirect = (res: ServerResponse, location: string): void => {
    res.writeHead(302, { Location: location }).end();
};

export function redirectAuth (callback?: (context: GetServerSidePropsContext) => GetServerSidePropsResult<unknown>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> => {
        const cookies = context?.req?.headers?.cookie && parse(context.req.headers.cookie);
        if (cookies && cookies['jwt']) {
            const user = jwtDecode(cookies['jwt']) as { email: string };
            if (user.email) sendRedirect(context.res, 'profile');
        }
        return callback ? callback(context) : { props: {} };
    };
}