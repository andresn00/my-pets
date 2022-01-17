import { Customer } from "./Customer";
import { SingleResponse } from "./RestObjects";

export interface Pet {
    id?: number
    name: string
    species: string
    race?: string
    sex: number
    color?: string
    birthday?: Date
    avatar?: string
    customer?: SingleResponse<Customer> | number | null
}