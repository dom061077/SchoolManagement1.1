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


import { Observable } from 'rxjs';
import { config } from '../service/config';
import { Userinfo } from './user.model';
import { Router } from '@angular/router';
//import * as fromApp from '../store/app.reducer';
/**
 * 
 * artículo para leer
 * https://medium.com/@seanhaddock_60973/how-to-add-a-bearer-token-to-api-calls-when-using-ngrx-317f35fbb6f2
 * 
 */

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor( private store: Store, private route: Router) {}

   intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (config.apiUrl && 
        req.url.startsWith(config.apiUrl)) {
        if(localStorage.getItem('userdata') != null){
          let jsonstring = localStorage.getItem('userdata') as string;
          const _obj = JSON.parse(jsonstring) as Userinfo; 
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${_obj.token}`
            },
          });
          return next.handle(authReq);          
        }else{
          if(req.url.indexOf('authenticate',0)>1)
            return next.handle(req);     
          else
            this.route.navigate(['login']);
        }
          /*
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
      );*/
    }
    return next.handle(req);
  }
}
