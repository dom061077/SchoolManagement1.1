import { Locality } from "@app/core/model/locality.model";
import { PersistenceService } from "@app/core/ports/persistence.service";
import { config } from "./config";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocaltyService extends PersistenceService<Localty> {
  protected override baseUrl = config.apiUrl + '/api/v1/localidad';
}   