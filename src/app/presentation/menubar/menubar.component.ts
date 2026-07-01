import { Store } from '@ngrx/store';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from '../../auth/keycloak/keycloak.service';
import { KeycloakProfile } from 'keycloak-js';
//import { fetchmenu } from 'src/app/Store/User/User.action';



//https://stackblitz.com/edit/angular-base-simple-scss-mfgt8p?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.scss,src%2Fapp%2Fapp.component.ts

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements DoCheck, OnInit {

  openSidebar: boolean = true;
  profile$: Promise<KeycloakProfile>;


  ismenuvisible = false;

  /*
    The actual Router service IS a Singleton
  */
  constructor(private router: Router, private store: Store, private ks: KeycloakService) {
    this.profile$ = this.ks.keycloak.loadUserProfile();
  }
  ngOnInit(): void {


  }
  ngDoCheck(): void {
    const currentroute = this.router.url;
    if (this.ks.keycloak.authenticated) {
      this.ismenuvisible = true
    } else {
      this.ismenuvisible = false;
    }
  }

  logout() {
    this.ks.keycloak.logout();
  }





}
