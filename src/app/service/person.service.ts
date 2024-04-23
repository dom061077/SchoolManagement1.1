import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../person/person.model';
import { config } from './config';
import { Userinfo } from '../auth/user.model';
import { PersonDataSource } from '../person/person.datasource.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseurl = config.apiUrl+'/api/v1/person';
  constructor(private http: HttpClient) {

  }
 
  getAll(offset:number, limit: number, qfilter: string) {
    /*
          this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Set the paginator
      this.paginator.length = data.length;
    
    */
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset",offset);
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("qfilters", qfilter);
    
    
    return this.http.get<PersonDataSource>(this.baseurl+'/list',{params: queryParams});
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
    let jsonstring = localStorage.getItem('userdata') as string;
    const _obj = JSON.parse(jsonstring) as Userinfo; 

    const headers = new HttpHeaders()
    .set('Authorization',  `Bearer ${_obj.access_token}`);
   
    return this.http.post(this.baseurl+'/create', data ,{headers});
  }

}

