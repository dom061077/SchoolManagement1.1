import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../user.profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak(){
    if (!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://keycloak-sm:8080/',
        realm: 'book-social-network',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }

  

  async init(){
    console.log('Authenticating the user...');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    });
    if (authenticated) {
      this._profile = (await this.keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak.token || '';
      console.log('Token Parsed: ',this.keycloak.tokenParsed?.realm_access?.roles);
    }
  }
  login() {
    return this.keycloak.login();
  }

  hasRole(role:string ){
    return this.keycloak.tokenParsed?.realm_access?.roles.includes(role);// || false;
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }  
}
