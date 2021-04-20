import { NextApiRequest, NextApiResponse } from 'next'
import { HttpResponse, UnsupportedMethodError } from '../../../interfaces/http'
import { formatErrorResponse, formatHttpResponse } from '../../../libs/api'
import { StatusCodes } from 'http-status-codes'
import { backendApiService } from '../../../services/api'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== 'POST') throw new UnsupportedMethodError(req.method)
        const response = await backendApiService.post<HttpResponse<unknown>>('auth/reset-password', { data: req.body })
        formatHttpResponse(res, StatusCodes.OK, new HttpResponse(StatusCodes.OK, response.data))
    } catch (err) {
        formatErrorResponse(res, err)
    }
}
