import { User } from "./User";
import { Vet } from "./Vet";

export interface Employee {
    name: string
    ci?: string | null
    phone?: string | null
    address?: string | null
    vet?: Vet | number | null
    user?: User | number | null
    [x: string]: any
}