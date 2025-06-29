import { Component, OnInit } from '@angular/core';
import {KeycloakService} from '../../auth/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
/*
  constructor(private builder: FormBuilder, private store: Store) {

  }
  ngOnInit(): void {
   localStorage.clear();
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  Proceedlogin() {
    if (this.loginform.valid) {
      const _obj: Usercred = {
        username: this.loginform.value.username as string,
        password: this.loginform.value.password as string
      }
      this.store.dispatch(beginLogin({ usercred: _obj }))
    }
  }

  resetlogin() {
    this.loginform.reset();
  }
*/
constructor(
  private ss: KeycloakService
) {
}

async ngOnInit(): Promise<void> {
  await this.ss.init();
  await this.ss.login();
}
}
