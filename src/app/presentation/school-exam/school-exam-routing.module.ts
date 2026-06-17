import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SchoolExamListingComponent } from './school-exam-listing/school-exam-listing.component';

const routes = [
  { path: '', component: SchoolExamListingComponent },
  { path: 'list', component: SchoolExamListingComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SchoolExamRoutingModule { }
