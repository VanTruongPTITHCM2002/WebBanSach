export type ResponseData<T> ={
    statusCode : number,
    message: string,
    data ?: T
}