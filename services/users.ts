import { HttpResponse } from "../interfaces/http";
import { backendApiService } from "./api";

class UsersService {
    login (email: string, password: string): Promise<HttpResponse<string>> {
        return backendApiService.post<HttpResponse<string>>('auth/login', { data: { email, password } });
    }
}

export default new UsersService();