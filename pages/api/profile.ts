import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizationHeader } from "../../interfaces/auth";
import { formatErrorResponse, formatHttpResponse } from "../../libs/api";
import { backendApiService } from "../../services/api";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const { status, data } = await backendApiService.get('profile', { headers: new AuthorizationHeader(req.cookies.jwt) });
        formatHttpResponse(res, status, data);
    } catch (err) {
        formatErrorResponse(res, err);
    }
};
