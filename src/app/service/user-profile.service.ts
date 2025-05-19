import { HttpClient } from "@angular/common/http";
import { config } from "./config";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
export class UserProfileService{
    baseurl = config.apiUrl + '/api/v1/auth';

    constructor(private http: HttpClient){

    }

    getMenuRole(){
        return this.http.get(this.baseurl+'/menubyrole');
    }

    getUserProfile(){
        return this.http.get(this.baseurl+'/userinfo');
    }
}