import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonInfo } from '../person/person.model';
import { config } from './config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  constructor(private http:HttpClient) { }

  addPerson(person: PersonInfo): Observable<PersonInfo>{
    return this.http.post<PersonInfo>(config.apiUrl+"/api/v1/person/create",person);
  }
}
