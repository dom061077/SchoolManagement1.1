import { Observable } from "rxjs";


export interface IPersistencePort<T, ID = number, Q = string, S = string>{
    list(offset: number, limit: number, query: string, qfilter: string, qsort: string): Observable<T[]>;
    getById(id: ID): Observable<T>;
    save(entity: T): Observable<T>;
    update(id: ID, entity: T): Observable<T>;
    delete(id: ID): Observable<void>;
}