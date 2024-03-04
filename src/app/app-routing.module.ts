import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonlistingComponent } from './component/personlisting/personlisting.component';

const routes: Routes = [
  {path: '',component: PersonlistingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
