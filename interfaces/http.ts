import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class HttpResponse <T> {
    error?: string;
    status: number;
    data: T;

    constructor (status: number, data: T) {
        this.status = status
        this.data = data
    }
}

export class HttpBackendError extends Error {
    status: number;
    error: string;
    data: unknown;

    constructor (
        status: number,
        error: string,
        data: unknown,
    ) {
        super();
        this.status = status
        this.error = error
        this.data = data
    }
}

export class UnsupportedMethodError extends HttpBackendError {
    private static readonly code = StatusCodes.METHOD_NOT_ALLOWED
    constructor (method: string) {
        super(UnsupportedMethodError.code, getReasonPhrase(UnsupportedMethodError.code), `${method} request is not allowed`)
    }
}