import { NextApiRequest, NextApiResponse } from 'next';
import { AuthorizationHeader } from '../../../interfaces/auth';
import { UnsupportedMethodError, HttpResponse } from '../../../interfaces/http';
import { formatHttpResponse, formatErrorResponse } from '../../../libs/api';
import { attendanceService } from '../../../services/attendance';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
        if (req.method !== 'GET') throw new UnsupportedMethodError(req.method);
        const response = await attendanceService.getAttendanceRecordsByStudent({ headers: new AuthorizationHeader(req.cookies.jwt) });
        formatHttpResponse(res, response.status, new HttpResponse(response.status, response.data));
    } catch (err) {
        formatErrorResponse(res, err);
    }
};