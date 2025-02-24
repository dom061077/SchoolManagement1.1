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
        
        url: 'http://keycloak-sm:8080/',//"https://www.warriorit.site/",//url: "http://warriorit.site:8080/",
        realm: 'book-social-network',
        clientId: 'bsn'
      });
      /*this._keycloak.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
      .then(authenticated => {
        if (authenticated) {
          setInterval(() => {
           this._keycloak?.updateToken(30).catch(() => this._keycloak?.login());
          }, 20000); // Check every 20s
        }
      });  */    
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

  /*

  async init() {
    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    }).then((authenticated) => {
      if (authenticated) {
        this.scheduleTokenRefresh();
      }
    }).catch((err) => {
      console.error('Keycloak initialization failed', err);
    });
  }

  private scheduleTokenRefresh() {
    // Refresh the token every 30 seconds before expiration
    this.tokenRefreshInterval = setInterval(() => {
      this.keycloak.updateToken(30).then((refreshed) => {
        if (refreshed) {
          console.log('Token successfully refreshed');
        }
      }).catch(() => {
        console.error('Failed to refresh token');
        this.logout();
      });
    }, 60000); // Run every 60 seconds
  }

  logout() {
    clearInterval(this.tokenRefreshInterval);
    this.keycloak.logout();
  }

  */
}
