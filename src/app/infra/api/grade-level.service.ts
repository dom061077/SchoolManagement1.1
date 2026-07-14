import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { GradeLevel } from '@app/core/model/grade-level.model';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class GradeLevelService extends PersistenceService<GradeLevel> {
  protected override baseUrl = config.apiUrl + '/grade-level';
}
