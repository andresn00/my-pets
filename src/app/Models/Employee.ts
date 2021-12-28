import { SingleResponse } from "./RestObjects";
import { User } from "./User";
import { Vet } from "./Vet";

export interface Employee {
    name: string
    ci?: string | null
    phone?: string | null
    address?: string | null
    vet?: SingleResponse<Vet> | number | null
    user?: SingleResponse<User> | number | null
    [x: string]: any
}