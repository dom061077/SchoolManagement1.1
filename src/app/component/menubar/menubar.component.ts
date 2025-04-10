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

  menuSidebar = [
    {
      link_name: "Dashboard",
      link: "/dashboard",
      icon: "bx bx-grid-alt",
      sub_menu: []
    }, {
      link_name: "Category",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        {
          link_name: "HTML & CSS",
          link: "/html-n-css",
        }, {
          link_name: "JavaScript",
          link: "/javascript",
        }, {
          link_name: "PHP & MySQL",
          link: "/php-n-mysql",
        }
      ]
    }, {
      link_name: "Posts",
      link: null,
      icon: "bx bx-book-alt",
      sub_menu: [
        {
          link_name: "Web Design",
          link: "/posts/web-design",
        }, {
          link_name: "Login Form",
          link: "/posts/login-form",
        }, {
          link_name: "Card Design",
          link: "/posts/card-design",
        }
      ]
    }, {
      link_name: "Analytics",
      link: "/analytics",
      icon: "bx bx-pie-chart-alt-2",
      sub_menu: []
    }, {
      link_name: "Chart",
      link: "/chart",
      icon: "bx bx-line-chart",
      sub_menu: []
    }, {
      link_name: "Plugins",
      link: null,
      icon: "bx bx-plug",
      sub_menu: [
        {
          link_name: "UI Face",
          link: "/ui-face",
        }, {
          link_name: "Pigments",
          link: "/pigments",
        }, {
          link_name: "Box Icons",
          link: "/box-icons",
        }
      ]
    }, {
      link_name: "Explore",
      link: "/explore",
      icon: "bx bx-compass",
      sub_menu: []
    }, {
      link_name: "History",
      link: "/history",
      icon: "bx bx-history",
      sub_menu: []
    }, {
      link_name: "Setting",
      link: "/setting",
      icon: "bx bx-cog",
      sub_menu: []
    }
  ]



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
