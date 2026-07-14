

import { Injectable } from '@angular/core';
import { config } from './config';
import { EstudioEnum } from '../../core/model/estudioenum.model';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class EstudioEnumService extends PersistenceService<EstudioEnum> {
  protected override baseUrl = config.apiUrl + '/enum';
}