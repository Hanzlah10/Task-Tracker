export interface ResponseInterface<T> {
    data: T;
    success: Boolean;
    message: string;
    statusCode: number;
}

export interface ResponseError {
    statusCode: number;
    message: string
    errors: any,
    stack: string
}