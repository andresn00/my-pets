import { Employee } from "./Employee";

export interface Vet {
    name: string
    ruc?: string | null
    address: string | null
    phone?: string | null
    avatar?: any | null
    employees?: Employee[] | number[] | null
    [x: string]: any
}