import { Observable } from "rxjs";


export interface AutocompleteDataService {
    search(query: string): Observable<any[]>;
}