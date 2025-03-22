export type ResponseData<T> ={
    status : number,
    message: string,
    data ?: T
}