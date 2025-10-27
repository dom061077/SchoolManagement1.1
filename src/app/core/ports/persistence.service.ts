import { Observable } from "rxjs";
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
        throw new Error("Method not implemented.");
    }
    create(entity: T): Observable<T> {
        throw new Error("Method not implemented.");
    }
    update(id: number, entity: T): Observable<T> {
        throw new Error("Method not implemented.");
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