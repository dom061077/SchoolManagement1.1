import { Locality } from "@app/core/model/locality.model";
import { PersistenceService } from "../persistence.service";
import { config } from "../config";
import { Injectable } from "@angular/core";
import { ILocalityPersistencePort } from "./ilocality-persistence-port";
import { Observable } from "rxjs";
import { DataSource } from "@app/core/model/datasource.model";
import { Department } from "@app/core/model/department.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocalityService extends PersistenceService<Locality>  implements ILocalityPersistencePort{

  protected override baseUrl = config.apiUrl + '/api/v1/localidad';
  private readonly departmentsByProvinceUrl = config.apiUrl + '/api/v1/localidad/departamentos-por-provincia';
  private readonly localitiesByDepartmentUrl = config.apiUrl + '/api/v1/localidad/localidades-por-departamento';

  constructor( http: HttpClient) {
    super(http);
  }

  getDepartmentsByProvince(provinceId: string | number): Observable<DataSource<Department>> {
    const url = `${this.departmentsByProvinceUrl}/${provinceId}`;
    return this.http.get<DataSource<Department>>(url);
  }

  getLocalitiesByDepartment(departmentId: string | number): Observable<DataSource<Locality>> {
    const url = `${this.localitiesByDepartmentUrl}/${departmentId}`;
    return this.http.get<DataSource<Locality>>(url);
  }

}   