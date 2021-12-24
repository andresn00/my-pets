export interface User {
    id: number,
    username: string,
    email: string,
    provider?: string,
    confirmed?: boolean,
    blocked?: boolean,
    [x: string]: any
}