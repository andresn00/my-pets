import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { ListResponse } from "./RestObjects";
export interface Vet {
    id?: number
    name: string
    ruc?: string | null
    address: string | null
    phone?: string | null
    avatar?: any | null
    employees?: ListResponse<Employee> | number[] | null
    customers?: ListResponse<Customer> | number[] | null
    [x: string]: any
}