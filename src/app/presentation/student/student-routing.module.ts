import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentlistingComponent } from './studentlisting/studentlisting.component';   // Adjust the path as necessary

const routes = [
  // Define your routes here
  { path: '', component: StudentlistingComponent },
  { path: 'list', component: StudentlistingComponent }
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)  // Use forChild for feature modules.  It only registers more route configurations
  ],
  exports: [RouterModule]  // Export RouterModule to use in other modules if needed
})
export class StudentRoutingModule { }
