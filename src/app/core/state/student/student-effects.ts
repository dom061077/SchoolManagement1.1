import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CrudEffects } from '../../ngrx/effect-factory';
import { Student } from '../../model/student.model';
import { StudentService } from '../../../infra/api/student.service';
import { StudentActions } from './student-actions';

@Injectable()
export class StudentEffects extends CrudEffects<Student> {
  constructor(actions$: Actions, studentService: StudentService) {
    super(actions$, StudentActions, studentService);
  }
}
