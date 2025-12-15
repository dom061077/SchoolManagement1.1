import { Observable, throwError } from "rxjs";
import { IPersistencePort } from "./persistence-port";
import { DataSource } from "../model/datasource.model";
import { config } from "../../infra/api/config";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PersistenceService<T> implements IPersistencePort<T, number, string, any> {
    protected baseUrl!: string;
    constructor(private http: HttpClient){

    }
    getById(id: number): Observable<T> {
        return this.http.get<T>(this.baseUrl+'/'+id);
    }
    create(entity: T): Observable<T> {
        return this.http.post<T>(this.baseUrl+'/create', entity );
    }
    update(id: number, entity: T): Observable<T> {
         return throwError(new Error("Method not implemented."));
    }
    delete(id: number): Observable<void> {
        throw new Error("Method not implemented.");
    }

    list(offset: number, limit: number, qfilter: string, qsort: string): Observable<DataSource<T>>{
        let queryParams = new HttpParams();
        queryParams = queryParams.append("offset",offset);
        queryParams = queryParams.append("limit",limit);
        queryParams = queryParams.append("qfilters", qfilter);
        queryParams = queryParams.append("sorts",qsort);
    
    
        return this.http.get<DataSource<T>>(this.baseUrl+'/list',{params: queryParams});
    }
    
}