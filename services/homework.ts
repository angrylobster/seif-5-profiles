import { AxiosRequestConfig } from "axios";
import { Homework } from "../interfaces/homework";
import { HttpResponse } from "../interfaces/http";
import { backendApiService } from "./api";

class HomeworkService {
    getHomeworkColumns (): Promise<HttpResponse<Homework[]>> {
        return backendApiService.get<HttpResponse<Homework[]>>('homework/columns');
    }

    getHomeworkCompletion (options?: Partial<AxiosRequestConfig>): Promise<HttpResponse<string[]>> {
        return backendApiService.get<HttpResponse<string[]>>('homework/student', options);
    }

    getHomeworkByStudent (options?: Partial<AxiosRequestConfig>): Promise<HttpResponse<Homework>> {
        return backendApiService.get<HttpResponse<Homework>>('homework', options);
    }
}

export default new HomeworkService();