export type ResponseData<T> ={
    statusCode : number,
    success: boolean,
    message: string,
    data ?: T
}