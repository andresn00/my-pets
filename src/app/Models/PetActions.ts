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

export interface Control {
    id?: number
    datetime: string
    weight: string
    temperature: string
    pet?: SingleResponse<Pet> | number
    vet?: SingleResponse<Vet> | number
    employees?: ListResponse<Employee> | number[]
}

export interface Vaccine {
    id?: number
    datetime: string
    pet?: SingleResponse<Pet> | number
    vet?: SingleResponse<Vet> | number
    employees?: ListResponse<Employee> | number[]
    type?: string
    dose?: string
    administrationRoute?: string
    observations?: string
}