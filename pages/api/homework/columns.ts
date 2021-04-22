import { NextApiRequest, NextApiResponse } from "next";
import { UnsupportedMethodError, HttpResponse } from "../../../interfaces/http";
import { formatHttpResponse, formatErrorResponse } from "../../../libs/api";
import homeworkService from '../../../services/homework';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== 'GET') throw new UnsupportedMethodError(req.method);
        const response = await homeworkService.getHomeworkColumns();
        formatHttpResponse(res, response.status, new HttpResponse(response.status, response.data));
    } catch (err) {
        formatErrorResponse(res, err);
    }
};
