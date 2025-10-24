import { Injectable } from '@angular/core';
import { config } from './config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPersistencePort } from '../../core/ports/persistence-port';
import { Student } from '../../core/model/student.model';
import { Observable } from 'rxjs';
import { DataSource } from '../../core/model/datasource.model';
import { PersistenceService } from '../../core/ports/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends PersistenceService<Student> {
  



}
