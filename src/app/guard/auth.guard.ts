import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { inject } from '@angular/core';
import { Userinfo } from '../auth/user.model';
import {KeycloakService} from '../auth/keycloak/keycloak.service';

/*
export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  let menuname = '';
  return true;
  if(route.url.length>0){
    menuname=route.url[0].path;
  }
   
  const userinfo: Userinfo = service.getuserdatafromstorage();
  if (userinfo.username != '' && userinfo.username != null) {
    if (menuname != '') {
      service.haveMenuAccess(userinfo.role, menuname).subscribe(item => {
        const _menudata = item;
        console.log(_menudata);
        if (_menudata.length > 0) {
          return true
        } else {
          alert('Unautorized access.')
          router.navigate(['']);
          return false;
        }
      })
    } else {
      return true;
    }

    return true;
  } else {
    router.navigate(['login']);
    return false;
  }  
};
*/
export const authGuard: CanActivateFn = () => {
  const tokenService = inject(KeycloakService);
  const router = inject(Router);
  if (tokenService.keycloak.isTokenExpired()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};