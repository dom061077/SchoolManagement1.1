import { Store } from '@ngrx/store';
import { Roleaccess, Userinfo } from '../../auth/user.model';
import { getmenubyrole } from '../../auth/store/user.selectors';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { beginLogout, fetchmenu } from '../../auth/store/user.actions';
import { KeycloakService } from '../../auth/keycloak/keycloak.service';
import { UserProfile } from '../../user-profile/user-profile.model';
import { Observable } from 'rxjs';
import { selectProfile } from '../../user-profile/store/user-profile.selectors';
import * as UserProfileActions from '../../user-profile/store/user-profile.actions';
//import { fetchmenu } from 'src/app/Store/User/User.action';



//https://stackblitz.com/edit/angular-base-simple-scss-mfgt8p?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.scss,src%2Fapp%2Fapp.component.ts

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements DoCheck, OnInit {

  openSidebar: boolean = true;



  profile$: Observable<UserProfile | null>;
  ismenuvisible = false;
  menulist !: Roleaccess[]
  constructor(private router: Router, private store: Store, private ks: KeycloakService) {
    this.profile$ = this.store.select(selectProfile);
  }
  ngOnInit(): void {
    this.store.dispatch(UserProfileActions.loadProfile());
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      const _obj = JSON.parse(jsonstring) as Userinfo;
      this.store.dispatch(fetchmenu());
    }
    /*this.store.select(selectProfile).subscribe(profile => {
      console.log('Profile data:', profile);
    });
    */
    this.profile$.subscribe(profile=>{
      console.log('Profile data: ',profile);
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

  showProfile() {
    console.log('ShowProfile event!!!');
    this.store.dispatch(UserProfileActions.loadProfile());
  }  



  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

}
