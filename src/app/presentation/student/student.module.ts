import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from '../../material.module';
import { StudentaddeditComponent } from './studentaddedit/studentaddedit.component';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from '../../core/state/student/student-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../../core/state/student/student-effects';



@NgModule({
  declarations: [
    StudentlistingComponent,
    StudentaddeditComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(studentFeature.name, studentFeature.reducer),
    EffectsModule.forFeature([StudentEffects])  ,  
    MaterialModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
