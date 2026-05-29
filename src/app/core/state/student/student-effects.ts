import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EffectFactory } from '../../ngrx/effect-factory';
import { StudentActions } from '../student/student-actions';
import { StudentService } from '../../../infra/api/student.service';
import { Student } from '../../model/student.model';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class StudentEffects extends EffectFactory<Student> {
  constructor(actions$: Actions, protected override service: StudentService, translate: TranslateService) {
    super(actions$, StudentActions, service, translate);
  }

  searchStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.searchStudents),
      mergeMap(({ dni, lastName, firstName, pageIndex, pageSize }) => {
        return (this.service as StudentService).searchStudents(dni, lastName, firstName, pageIndex, pageSize).pipe(
          map((response) => StudentActions.searchStudentsSuccess({ students: response.content, total: response.totalElements })),
          catchError((error) => of(StudentActions.searchStudentsFailure({ error }))) // 👈 ERROR FIX
        );
      })
    )
  );
}
