import { Observable } from "rxjs";
import { IPersistencePort } from "@app/core/ports/persistence-port";
import { DataSource } from "@app/core/model/datasource.model";
import { config } from "./config";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class PersistenceService<T> implements IPersistencePort<T, number, string, any> {
    protected baseUrl!: string;
    constructor(public http: HttpClient){

    }
    getById(id: number): Observable<T> {
        return this.http.get<T>(this.baseUrl+'/'+id);
    }
    create(entity: T): Observable<T> {
        return this.http.post<T>(this.baseUrl+'/create', entity );
    }
    update(id: number, entity: T): Observable<T> {
        return this.http.put<T>(this.baseUrl+'/'+id, entity );
    }
    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl+'/'+id);
    }

    list(offset: number, limit: number, qfilter: string, qsort: string, loperator: string): Observable<DataSource<T>>{
        let queryParams = new HttpParams();
        queryParams = queryParams.append("offset",offset);
        queryParams = queryParams.append("limit",limit);
        queryParams = queryParams.append("qfilters", qfilter);
        queryParams = queryParams.append("sorts",qsort);
        queryParams = queryParams.append("loperator",loperator);
    
    
        return this.http.get<DataSource<T>>(this.baseUrl+'/list',{params: queryParams});
    }
    
}
