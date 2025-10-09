import { Observable } from "rxjs";


export interface IPersistencePort<T, ID = number, Q = any, S = any>{
    list(query: string): Observable<T[]>;
    save(entity: T): Observable<T>;
    update(id: ID, entity: T): Observable<T>;
    delete(id: ID): Observable<void>;
}