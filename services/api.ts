import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { getReasonPhrase } from 'http-status-codes';
import { HttpBackendError, HttpResponse } from '../interfaces/http'

class ApiService {
    private readonly client: AxiosInstance;

    constructor (config?: AxiosRequestConfig) {
        this.client = axios.create(config)
    }

    get <T> (path: string, options?: Partial<AxiosRequestConfig>): Promise<HttpResponse<T>> {
        return this.executeHttpCall<T>('get', path, options)
    }

    post <T> (path: string, options: Partial<AxiosRequestConfig>): Promise<HttpResponse<T>> {
        return this.executeHttpCall<T>('post', path, options)
    }

    private async executeHttpCall <T> (
        method: Method,
        url: string,
        options?: Partial<AxiosRequestConfig>
    ): Promise<HttpResponse<T>> {
        try {
            const response = await this.client.request({
                url,
                method,
                ...options,
            } as AxiosRequestConfig)
            return response.data
        } catch (err) {
            const { response: { status, data } } = err as AxiosError
            throw new HttpBackendError(status, getReasonPhrase(status), data.data)
        }
    }
}

class FrontendApiService extends ApiService {
    constructor () {
        super({ withCredentials: true })
    }
}

class BackendApiService extends ApiService {
    constructor () {
        super({ baseURL: process.env.BACKEND_HOSTNAME })
    }
}

export const frontendApiService = new FrontendApiService()
export const backendApiService = new BackendApiService()