import { Inject, Injectable } from "@angular/core";
import { config } from "./config";
import { PersistenceService } from "./persistence.service";
import { Province } from "@app/core/model/province.model";

@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends PersistenceService<Province> {
    protected override baseUrl = config.apiUrl + '/api/v1/provincia';
}
