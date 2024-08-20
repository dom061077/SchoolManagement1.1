import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../person/person.model';
import { config } from './config';
import { Userinfo } from '../auth/user.model';
import { PersonDataSource } from '../person/person.datasource.model';
import { ɵnormalizeQueryParams } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseurl = config.apiUrl+'/api/v1/person';
  constructor(private http: HttpClient) {

  }
 
  getAll(offset:number, limit: number, qfilter: string, sorts: string) {
    /*
          this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Set the paginator
      this.paginator.length = data.length;
    
    */
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset",offset);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("qfilters", qfilter);
    queryParams = queryParams.append("sorts",sorts);
    
    
    return this.http.get<PersonDataSource>(this.baseurl+'/list',{params: queryParams});
  }

  getPersonCertificate(id:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("personId",id);
    return this.http.get(this.baseurl+'/certificate?personId='+id,{ responseType: 'blob' });
  }

  Getbycode(code: number) {
    return this.http.get<Person>(this.baseurl + '/' + code);
  }
  Delete(code: number) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(data: Person) {
    return this.http.put(this.baseurl + '/' + data.id, data);
  }
  Create(data: Person) {

   
    return this.http.post(this.baseurl+'/create', data );
  }

}

