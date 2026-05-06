import { Injectable } from "@angular/core";
import { PersistenceService } from "@app/core/ports/persistence.service";
import { AcademicYear } from "@app/core/model/academic-year.model";
import { config } from "./config";

@Injectable({
    providedIn: 'root'
})
export class AcademicYearService extends PersistenceService<AcademicYear> {
    protected override baseUrl = config.apiUrl + '/api/v1/academic-year';
}