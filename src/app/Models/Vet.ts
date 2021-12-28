import { Employee } from "./Employee";
import { ListResponse } from "./RestObjects";
export interface Vet {
    name: string
    ruc?: string | null
    address: string | null
    phone?: string | null
    avatar?: any | null
    employees?: ListResponse<Employee> | number[] | null
    [x: string]: any
}