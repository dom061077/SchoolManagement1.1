import { Injectable } from '@angular/core';
import { config } from '../../service/config';
import { HttpClient } from '@angular/common/http';
import { IPersistencePort } from '../../core/ports/persistence-port';
import { Student } from '../../core/model/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements IPersistencePort<Student, number, string, any> {
  baseurl = config.apiUrl+'/api/v1/student';
  constructor(private http: HttpClient) { }
  list(query: string): Observable<Student[]> {
    throw new Error('Method not implemented.');
  }
  save(entity: Student): Observable<Student> {
    throw new Error('Method not implemented.');
  }
  update(id: number, entity: Student): Observable<Student> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
