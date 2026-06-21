import { Injectable } from '@angular/core';
import { config } from './config';
import { School } from '../../core/model/school.model';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolService extends PersistenceService<School> {
  protected override baseUrl = config.apiUrl + '/api/v1/school';
}
