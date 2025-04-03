import { HttpClient } from "@angular/common/http";
import { config } from "./config";

export class UserProfileService{
    baseurl = config.apiUrl + '/api/v1/auth';

    constructor(private http: HttpClient){

    }

    getMenuRole(){
        return this.http.get(this.baseurl+'/menubyrole');
    }
}