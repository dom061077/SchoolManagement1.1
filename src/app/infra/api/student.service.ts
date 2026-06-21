import { Injectable } from '@angular/core';
import { config } from './config';
import { Student } from '../../core/model/student.model';
import { PersistenceService } from './persistence.service';
import { Observable } from 'rxjs';
import { DataSource } from '@app/core/model/datasource.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends PersistenceService<Student> {
  protected override baseUrl = config.apiUrl + '/api/v1/alumno';

  searchStudents(dni: number, lastName: string, firstName: string, pageIndex: number, pageSize: number): Observable<DataSource<Student>> {
    const url = `${this.baseUrl}/search?dni=${dni}&lastName=${lastName}&firstName=${firstName}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<DataSource<Student>>(url);
  }


}
