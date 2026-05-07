import { Injectable } from '@angular/core';
import { PersistenceService } from '@app/core/ports/persistence.service';
import { GradeLevel } from '@app/core/model/grade-level.model';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class GradeLevelService extends PersistenceService<GradeLevel> {
  protected override baseUrl = config.apiUrl + '/api/v1/grade-level';
}
