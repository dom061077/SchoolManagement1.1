import { Observable } from "rxjs";
import { DataSource } from "../model/datasource.model";


export interface IPersistencePort<T, ID = number, Q = string, S = string>{
    list(offset: number, limit: number,  qfilter: string, qsort: string): Observable<DataSource<T>>;
    getById(id: ID): Observable<T>;
    create(entity: T): Observable<T>;
    update(id: ID, entity: T): Observable<T>;
    delete(id: ID): Observable<void>;
}