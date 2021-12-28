import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { SingleResponse } from "./RestObjects";

export interface User {
    id?: number,
    username: string,
    email: string,
    provider?: string,
    confirmed?: boolean,
    blocked?: boolean,
    employee?: SingleResponse<Employee> | number
    customer?: SingleResponse<Customer> | number
    isEmployee: boolean
    [x: string]: any
}