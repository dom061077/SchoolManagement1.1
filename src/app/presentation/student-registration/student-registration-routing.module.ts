import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudentRegistrationListingComponent } from './student-registration-listing/student-registration-listing.component';

const routes = [
  { path: '', component: StudentRegistrationListingComponent },
  { path: 'list', component: StudentRegistrationListingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRegistrationRoutingModule { }
