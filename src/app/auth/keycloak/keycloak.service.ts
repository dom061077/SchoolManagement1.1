import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private isRefreshing = false;

  // Track if Keycloak server is reachable
  public isServerDown$ = new BehaviorSubject<boolean>(false);
  public isServerDown = false;
  public errorMessage: string | null = null;

  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://keycloak-sm:8080/',
        realm: 'book-social-network',
        clientId: 'bsn'
      });
    }
    return this._keycloak;
  }

  async init(...args: []): Promise<boolean> {
    console.log('Authenticating user with Keycloak...');

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false // prevents iframe timeout errors when server is down
      });

      if (authenticated) {
        console.log('Authenticated successfully');
        this.setupTokenRefresh();
      }

      this.isServerDown = false;
      this.isServerDown$.next(false);
      return authenticated;

    } catch (error) {
      console.error('Keycloak initialization failed - server is unreachable:', error);

      this.isServerDown = true;
      this.isServerDown$.next(true);
      this.errorMessage = 'Unable to connect to the Authentication Service (Keycloak). Please make sure the service is running.';

      // Optional: Inject a fail-safe overlay directly to the DOM in case Angular routing hasn't started yet
      this.showFallbackErrorScreen();

      // Return false instead of rethrowing, allowing the app to render the error screen rather than crashing
      return false;
    }
  }

  private setupTokenRefresh() {
    this.keycloak.onTokenExpired = () => {
      if (this.isRefreshing) return;
      this.isRefreshing = true;

      this.keycloak.updateToken(30)
        .then((refreshed) => {
          if (refreshed) console.log('Token refreshed successfully');
        })
        .catch(() => {
          console.error('Token refresh failed, logging out...');
          this.logout();
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    };
  }

  /**
   * Displays an immediate visual overlay if Keycloak fails during initial bootstrap
   */
  private showFallbackErrorScreen() {
    if (document.getElementById('keycloak-error-screen')) return;

    const overlay = document.createElement('div');
    overlay.id = 'keycloak-error-screen';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background-color: #f8fafc; z-index: 999999; display: flex;
      align-items: center; justify-content: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    overlay.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 32px; max-width: 480px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; margin: 16px;">
        <div style="width: 56px; height: 56px; background-color: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 style="margin: 0 0 8px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Authentication Service Unavailable</h2>
        <p style="margin: 0 0 24px 0; color: #64748b; font-size: 14px; line-height: 1.5;">
          Could not connect to Keycloak (<strong>http://keycloak-sm:8080/</strong>). Please check your connection or start the service and try again.
        </p>
        <button id="retry-btn" style="background-color: #2563eb; color: white; border: none; padding: 10px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; cursor: pointer; transition: background 0.2s;">
          Retry Connection
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.getElementById('retry-btn')?.addEventListener('click', () => {
      window.location.reload();
    });
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }

  hasRole(role: string) {
    return this.keycloak.tokenParsed?.realm_access?.roles.includes(role);
  }
}
