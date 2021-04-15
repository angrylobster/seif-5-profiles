import { NextApiRequest, NextApiResponse } from "next";
import { AuthorizationHeader } from "../../../interfaces/auth";
import { backendApiService } from "../../../services/api";
import { formatErrorResponse, formatHttpResponse } from "../../../utils/api";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const response = await backendApiService.get('auth/hello', { headers: new AuthorizationHeader(req.cookies.jwt) });
        return formatHttpResponse(res, response.status, response.data);
    } catch (err) {
        return formatErrorResponse(res, err);
    }
}