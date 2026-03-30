import { Observable } from "rxjs";
import { IPersistencePort } from "../persistence-port";

import { Department } from "@app/core/model/department.model";
import { Locality } from "@app/core/model/locality.model";
// locality.persistence.port.ts
export interface ILocalityPersistencePort extends IPersistencePort<Locality> {
    // We add the specific method for your cascading logic
    getDepartmentsByProvince(provinceId: number): Observable<Department[]>;
}