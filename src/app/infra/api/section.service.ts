import { PersistenceService } from "./persistence.service";
import { Section } from "../../core/model/section.model";
import { Injectable } from "@angular/core";
import { config } from "./config";

@Injectable({
    providedIn: 'root'
})
export class SectionService extends PersistenceService<Section> {
    protected override baseUrl = config.apiUrl + '/api/v1/section';
}