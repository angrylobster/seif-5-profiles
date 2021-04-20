import { NextApiRequest, NextApiResponse } from "next";
import { formatErrorResponse, formatHttpResponse } from "../../../libs/api";
import jwtDecode from "jwt-decode";
import { HttpBackendError } from "../../../interfaces/http";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        const jwt = req?.cookies?.jwt;
        if (!jwt) throw new HttpBackendError(StatusCodes.BAD_REQUEST, getReasonPhrase(StatusCodes.BAD_REQUEST), 'No jwt found')
        const user = jwtDecode(req?.cookies?.jwt);
        return formatHttpResponse(res, StatusCodes.OK, user);
    } catch (err) {
        return formatErrorResponse(res, err);
    }
}