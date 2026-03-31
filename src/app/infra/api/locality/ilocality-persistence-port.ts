
import { DataSource } from "@app/core/model/datasource.model";
import { Department } from "@app/core/model/department.model";
import { Locality } from "@app/core/model/locality.model";
import { IPersistencePort } from "@app/core/ports/persistence-port";
import { Observable } from "rxjs";

export interface ILocalityPersistencePort extends IPersistencePort<Locality, number, string, any> {
    
    getDepartmentsByProvince(provinceId: number): Observable<DataSource<Department>>;

}