import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { Usercred, Userinfo } from '../store/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userLogin(user: Usercred): Observable<Userinfo>{
    return this.http.post(config.apiUrl+"/api/v1/auth",{email:user.username})
  }
}
