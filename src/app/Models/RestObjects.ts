export interface SingleResponse<T> {
    data: {
        id: number
        attributes: T
    }
    [x: string]: any
}
export interface ListResponse<T> {
    data: {
        id: number
        attributes: T
    }[]
    [x: string]: any
}

export interface RestBody<T> {
    data: T
}
