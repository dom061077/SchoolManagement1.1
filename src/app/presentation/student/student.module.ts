import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from '../../material.module';
import { StudentaddeditComponent } from './studentaddedit/studentaddedit.component';



@NgModule({
  declarations: [
    StudentlistingComponent,
    StudentaddeditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
