import { Appointment } from "./Appointment";
import { Customer } from "./Customer";
import { Employee } from "./Employee";
import { Pet } from "./Pet";
import { User } from "./User";
import { Vet } from "./Vet";

export interface RestObject {
    data: {
        id: number
        attributes: User | Employee | Vet | Customer | Pet | Appointment
    }
    [x: string]: any
}