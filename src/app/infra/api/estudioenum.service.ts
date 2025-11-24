

import { Injectable } from '@angular/core';
import { config } from './config';
import { EstudioEnum } from '../../core/model/estudioenum.model';
import { PersistenceService } from '../../core/ports/persistence.service';  

@Injectable({
  providedIn: 'root'
})
export class EstudioEnumService extends PersistenceService<EstudioEnum> {
  protected override baseUrl = config.apiUrl + '/api/v1/estudioenum';
}