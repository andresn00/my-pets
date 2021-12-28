import { Pet } from "./Pet";
import { User } from "./User";
import { Vet } from "./Vet";

export interface Customer {
    name: string
    ci?: string | null
    phone?: string | null
    address?: string | null
    vets?: Vet[] | number[] | null
    user?: User | number | null
    pets?: Pet[] | number[] | null
    [x: string]: any
}