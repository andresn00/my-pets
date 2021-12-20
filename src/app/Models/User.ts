export interface User {
    id: number,
    username: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    [x: string]: any
}