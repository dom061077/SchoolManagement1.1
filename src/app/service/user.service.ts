import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { Roleaccess, Usercred, Userinfo } from '../auth/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

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

  getuserdatafromstorage() {
    let _obj: Userinfo = {
      id: 0,
      username: '',
      email: '',
      name: '',
      role: '',
      access_token: '',
      status: false,
      menu_list: []
    }
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }

  }  

  getMenubyRole(): Observable<Roleaccess[]> {
    const _obj:Userinfo = this.getuserdatafromstorage();
    return of(_obj.menu_list);
  }

  haveMenuAccess(userrole: string, menuname: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>(config.apiUrl+'http://localhost:3000/roleaccess?role=' + userrole + '&menu=' + menuname);
  }  

}
