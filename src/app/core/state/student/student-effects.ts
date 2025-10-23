import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { studentActions } from '../student/student-actions';
import { StudentService } from '../../../infra/api/student.service';
import { Student } from '../../model/student.model';

@Injectable()
export class StudentEffects extends EffectFactory<Student> {
  constructor(actions$: Actions, service: StudentService) {
    super(actions$, studentActions, service);
  }
}
