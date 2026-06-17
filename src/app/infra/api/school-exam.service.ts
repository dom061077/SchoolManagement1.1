import { Injectable } from '@angular/core';
import { config } from './config';
import { SchoolExam } from '../../core/model/school-exam.model';
import { PersistenceService } from '../../core/ports/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class SchoolExamService extends PersistenceService<SchoolExam> {
  protected override baseUrl = config.apiUrl + '/api/v1/school-exams';
}
