import { Employee } from "./Employee";
import { Pet } from "./Pet";
import { ListResponse, SingleResponse } from "./RestObjects";
import { Vet } from "./Vet";

export interface Appointment {
    id?: number
    description: string
    datetime: string
    status: string
    pet: SingleResponse<Pet> | number
    vet: SingleResponse<Vet> | number
    employees: ListResponse<Employee> | number[]
    [x: string]: any
}