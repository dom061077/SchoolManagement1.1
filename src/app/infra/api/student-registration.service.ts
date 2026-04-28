import { Injectable } from '@angular/core';
import { config } from './config';
import { StudentRegistration } from '../../core/model/student-registration.model';
import { PersistenceService } from '../../core/ports/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService extends PersistenceService<StudentRegistration> {
  protected override baseUrl = config.apiUrl + '/api/v1/student-registrations';
}
