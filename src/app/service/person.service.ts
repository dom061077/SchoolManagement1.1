import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../store/model/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = 'http://localhost:8080/api/v1/person/list';
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Person[]>(this.baseUrl);
  }
}
