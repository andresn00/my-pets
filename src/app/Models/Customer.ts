import { Pet } from "./Pet";
import { ListResponse, SingleResponse } from "./RestObjects";
import { User } from "./User";
import { Vet } from "./Vet";

export interface Customer {
    id?: number
    name: string
    ci?: string | null
    phone?: string | null
    address?: string | null
    vets?: ListResponse<Vet> | number[] | null
    user?: SingleResponse<User> | number | null
    pets?: ListResponse<Pet> | number[] | null
    [x: string]: any
}