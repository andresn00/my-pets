import { Appointment, Control, Vaccine } from "./PetActions";
import { Customer } from "./Customer";
import { ListResponse, SingleResponse } from "./RestObjects";

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
    appointments?: ListResponse<Appointment>
    controls?: ListResponse<Control>
    vaccines?: ListResponse<Vaccine>
}