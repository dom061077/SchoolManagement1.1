// autocomplete.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPersistencePort } from '../../core/ports/persistence-port';

@Injectable({ providedIn: 'root' })
export class AutocompleteService implements IPersistencePort<any, number, string, any> {
  constructor(private http: HttpClient) {}
  list(query: string): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
  save(entity: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number, entity: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }


}
