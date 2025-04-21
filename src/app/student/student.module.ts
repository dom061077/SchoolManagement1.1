import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [
    StudentlistingComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
