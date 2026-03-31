import { Locality } from "@app/core/model/locality.model";
import { PersistenceService } from "@app/core/ports/persistence.service";
import { config } from "../config";
import { Injectable } from "@angular/core";
import { ILocalityPersistencePort } from "./ilocality-persistence-port";
import { Observable } from "rxjs";
import { DataSource } from "@app/core/model/datasource.model";
import { Department } from "@app/core/model/department.model";

@Injectable({
  providedIn: 'root'
})
export class LocaltyService extends PersistenceService<Locality>  implements ILocalityPersistencePort{
  getDepartmentsByProvince(provinceId: string | number): Observable<DataSource<Department>> {
    throw new Error("Method not implemented.");
  }
  protected override baseUrl = config.apiUrl + '/api/v1/localidad';
}   