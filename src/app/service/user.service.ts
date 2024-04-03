import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { Usercred, Userinfo } from '../auth/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userLogin(user: Usercred): Observable<Userinfo>{
    return this.http.post<Userinfo>(config.apiUrl+"/api/v1/auth/authenticate",{email:user.username,password: user.password})
  }

  setUserToLoaclStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

}
