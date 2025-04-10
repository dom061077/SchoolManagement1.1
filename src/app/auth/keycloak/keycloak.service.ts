import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../user.profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private isRefreshing = false;

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


  async init(...args: []) {
    console.log('Authenticating the user...');

    this.keycloak.onAuthSuccess = () => {
      console.log('Token successfully refreshed');
    };

    this.keycloak.onTokenExpired = () => {
      if (this.isRefreshing) return; // Avoid duplicate refresh calls
    
      console.log('Token expired, attempting to refresh...');
      this.isRefreshing = true;
    
      this.keycloak.updateToken(30).then((refreshed) => {
        if (refreshed) {
          console.log('Token successfully refreshed');
        } else {
          console.warn('Token was still valid, no need to refresh');
        }
      }).catch(() => {
        console.error('Token refresh failed, logging out...');
        this.logout();
      }).finally(() => {
        this.isRefreshing = false; // Reset flag after refresh attempt
      });
    };    
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    }).then((authenticated) => {
      if (authenticated == true) {
        this._profile = ( this.keycloak.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak.token || '';
        console.log('User profile: '+this._profile);
        console.log('Token Parsed: ', this.keycloak.tokenParsed?.realm_access?.roles);        
        this.keycloak.onAuthLogout = () => {
            console.log("User logged out");  
        }

      }
    }).catch((err) => {
      console.error('Keycloak initialization failed', err);
    });

    


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
