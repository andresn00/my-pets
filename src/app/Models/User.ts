import { Customer } from "./Customer";
import { Employee } from "./Employee";

export interface User {
    id?: number,
    username: string,
    email: string,
    provider?: string,
    confirmed?: boolean,
    blocked?: boolean,
    employee?: Employee | number
    customer?: Customer | number
    [x: string]: any
}