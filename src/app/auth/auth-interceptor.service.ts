import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpEvent
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { config } from '../service/config';
//import * as fromApp from '../store/app.reducer';
/**
 * 
 * artículo para leer
 * https://medium.com/@seanhaddock_60973/how-to-add-a-bearer-token-to-api-calls-when-using-ngrx-317f35fbb6f2
 * 
 */

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (config.apiUrl && 
        req.url.startsWith(config.apiUrl)) {
      return this.store.select(userFeature.selectCurrentUser).pipe(
        first(),
        mergeMap((currentUser) => {
          if (currentUser) {
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser.authToken}`
              },
            });
            return next.handle(authReq);
          }
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
}
