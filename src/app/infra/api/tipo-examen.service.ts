import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { TipoExamen } from '@app/core/model/tipo-examen.model';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class TipoExamenService extends PersistenceService<TipoExamen> {
  protected override baseUrl = config.apiUrl + '/type-exam'
}
