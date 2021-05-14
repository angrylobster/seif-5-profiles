import { AxiosRequestConfig } from 'axios';
import { Attendance, AttendanceDataDto } from '../interfaces/attendance';
import { HttpResponse } from '../interfaces/http';
import { backendApiService } from './api';

class AttendanceService {
    async getAttendanceRecordsByStudent (options?: Partial<AxiosRequestConfig>): Promise<HttpResponse<AttendanceDataDto>> {
        const response = await backendApiService.get<HttpResponse<Attendance[]>>('attendance', options);
        const result = new AttendanceDataDto();
        response.data.forEach((attendanceRecord: Attendance) => {
            if (result.records[attendanceRecord.record]) {
                result.records[attendanceRecord.record].push(attendanceRecord);
            }
        });
        result.totalRecords = response.data.length;
        return new HttpResponse(response.status, result);
    }
}

export const attendanceService = new AttendanceService();