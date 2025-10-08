// autocomplete.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutocompleteService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/items/search?q=${encodeURIComponent(query)}`);
  }
}
