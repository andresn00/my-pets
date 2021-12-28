import { Employee } from "./Employee";
import { User } from "./User";

export interface Session {
    jwt: string,
    user: User
}