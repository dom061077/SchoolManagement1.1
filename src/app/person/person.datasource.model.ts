import { Person } from "./person.model";

export interface PersonDataSource {
    total: number,
    data: Person[]
}