import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { studentReducer } from './state/student/student-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../infra/store/student.effects';
import { StudentService } from '../infra/api/student.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('students', studentReducer),
    EffectsModule.forFeature([StudentEffects])
  ],
  providers: [StudentService, StudenFacade]
})
export class StudentModule { }
