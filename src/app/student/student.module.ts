import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    StudentlistingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
