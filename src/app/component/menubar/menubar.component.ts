import { Store } from '@ngrx/store';
import { Roleaccess, Userinfo } from '../../auth/user.model';
import { getmenubyrole } from '../../auth/store/user.selectors';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { beginLogout, fetchmenu } from '../../auth/store/user.actions';
import { KeycloakService } from '../../auth/keycloak/keycloak.service';
//import { fetchmenu } from 'src/app/Store/User/User.action';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements DoCheck, OnInit {
  ismenuvisible = false;
  menulist !: Roleaccess[]
  constructor(private router: Router, private store: Store, private ks: KeycloakService) {

  }
  ngOnInit(): void {
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      const _obj = JSON.parse(jsonstring) as Userinfo;
      this.store.dispatch(fetchmenu());
    }

    this.store.select(getmenubyrole).subscribe(item => {
      this.menulist = item;
    })
  }
  ngDoCheck(): void {
    const currentroute = this.router.url;
    if (this.ks.keycloak.authenticated) {
      this.ismenuvisible = true
    } else {
      this.ismenuvisible = false;
    }
  }

 async logout() { 
    console.log("Cerrando sesión");
    this.store.dispatch(beginLogout());
  }

}
