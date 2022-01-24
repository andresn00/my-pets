import { Pet } from "./Pet";
import { SingleResponse } from "./RestObjects";
import { Vet } from "./Vet";

export interface Appointment {
    id?: number
    description: string
    date: Date | string
    status: string
    pet: SingleResponse<Pet>
    vet: SingleResponse<Vet>
    [x: string]: any
}