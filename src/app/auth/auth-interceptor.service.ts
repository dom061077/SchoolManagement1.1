import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import { Observable, throwError } from 'rxjs';
import { config } from '../service/config';
import { Userinfo } from './user.model';
import { Router } from '@angular/router';
import { loadPERSONfail } from '../person/store/person.actions';
import { KeycloakService } from './keycloak/keycloak.service';
//import * as fromApp from '../store/app.reducer';
/**
 * 
 * artículo para leer
 * https://medium.com/@seanhaddock_60973/how-to-add-a-bearer-token-to-api-calls-when-using-ngrx-317f35fbb6f2
 * 
 */

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  //constructor( private store: Store, private route: Router) {}
  constructor(
    private keycloakService: KeycloakService
  ) {}
   /*intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (config.apiUrl && 
        req.url.startsWith(config.apiUrl)) {
        if(localStorage.getItem('userdata') != null){
            let jsonstring = localStorage.getItem('userdata') as string;
          const _obj = JSON.parse(jsonstring) as Userinfo; 
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${ _obj.access_token }`
            }         
          });
          return next.handle(authReq)
            .pipe(
              catchError(error => {
                if(error.status == 403){
                  //throw new Error("Ingrese de nuevo con usuario y contraseña");
                  this.store.dispatch(loadPERSONfail({errormessage:'Ingrese con usuario y contraseña'}));
                  this.route.navigate(['login']);
                  //return next.handle();
                  throw error;
                }else{
                  throw error;
                }
                
              })
            );          
        }else{
          if(req.url.indexOf('authenticate',0)>1)
            return next.handle(req);     
          else
            this.route.navigate(['login']);
        }
    }
    return next.handle(req);
  }*/
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const token = this.keycloakService.keycloak.token;
      if (token) {

        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }         
        });        
        console.log('Request: '+authReq);
        return next.handle(authReq);
      }
      return next.handle(request);
    }
  } 
  

