import { Localty } from "@app/core/model/localty.model";
import { PersistenceService } from "@app/core/ports/persistence.service";
import { config } from "./config";

export class LocaltyService extends PersistenceService<Localty> {
  protected override baseUrl = config.apiUrl + '/api/v1/localidad';
}   