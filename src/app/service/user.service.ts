import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from './config';
import { Roleaccess, Usercred, Userinfo } from '../auth/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { KeycloakService } from '../auth/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  userLogin(user: Usercred): Observable<Userinfo>{
    return this.http.post<Userinfo>(config.apiUrl+"/api/v1/auth/authenticate",{email:user.username,password: user.password})
  }

  userLogout(){
    return this.keycloakService.keycloak.logout();
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
    return this.http.get<Roleaccess[]>(config.keycloakUrl);
  }

  haveMenuAccess(userrole: string, menuname: string): Observable<Roleaccess[]> {
    return this.http.get<Roleaccess[]>(config.apiUrl+'http://localhost:3000/roleaccess?role=' + userrole + '&menu=' + menuname);
  }  
  private startTokenMonitoring(): void {
    const keycloak = this.keycloakService.keycloak;

    keycloak.onTokenExpired = () => {
      this.handleSessionTimeout();
    };

    setInterval(() => {
      keycloak.updateToken(10).then(refreshed => {
        if (!refreshed) {
          this.handleSessionTimeout();
        }
      }).catch(() => {
        this.handleSessionTimeout();
      });
    }, 5000); // Check every 5 seconds
  }

  private handleSessionTimeout(): void {
    alert('Your session has expired. You will be redirected to the login page.');
    this.keycloakService.keycloak.logout();
  }
}
