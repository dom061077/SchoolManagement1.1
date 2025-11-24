import { Injectable } from '@angular/core';
import { config } from './config';
import { Student } from '../../core/model/student.model';
import { PersistenceService } from '../../core/ports/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends PersistenceService<Student> {
  protected override baseUrl = config.apiUrl + '/api/v1/alumno';




}
