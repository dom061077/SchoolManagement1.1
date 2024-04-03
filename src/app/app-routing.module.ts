import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonlistingComponent } from './component/personlisting/personlisting.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {path: '',component: PersonlistingComponent},
  {path:'login',component:LoginComponent},
  {path:'listperson', component: PersonlistingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
