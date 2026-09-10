import { inject } from '@angular/core';
import { signalStore, withMethods, patchState } from '@ngrx/signals';
import { setAllEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { Student } from '../../model/student.model';
import { StudentService } from '../../../infra/api/student.service';
import { withCrudStore } from '../../ngrx/crud-store.feature';

export const StudentStore = signalStore(
  { providedIn: 'root' },
  withCrudStore<Student>(StudentService),
  withMethods((store, studentService = inject(StudentService)) => ({
    searchStudents: rxMethod<{
      dni: number;
      lastName: string;
      firstName: string;
      pageIndex: number;
      pageSize: number;
    }>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(({ dni, lastName, firstName, pageIndex, pageSize }) =>
          studentService.searchStudents(dni, lastName, firstName, pageIndex, pageSize).pipe(
            tap((response) => {
              patchState(store, {
                loading: false,
                total: response.totalElements,
                error: null,
              });
              patchState(store, setAllEntities(response.content));
            }),
            catchError((error) => {
              patchState(store, { loading: false, error: error?.error || error });
              return of(null);
            })
          )
        )
      )
    ),

    searchStudentsByTerm(term: string, pageSize: number = 100) {
      let firstName = '';
      let filterObj: any[] = [];
      let termValues = term.split(' ');

      termValues.forEach((value) => {
        if (filterObj.length === 0) {
          if (Number.isInteger(Number(value))) {
            filterObj.push({ property: 'dni:eq', value: value });
          } else {
            filterObj.push({ property: 'lastName:like', value: value });
          }
        } else {
          firstName += value + ' ';
        }
      });

      if (firstName.trim() && filterObj.length > 0) {
        filterObj.push({ property: 'firstName:like', value: firstName.trim() });
      }

      if (!term.trim()) {
        filterObj = [];
      }

      const filter = JSON.stringify(filterObj);
      store.loadAll({
        pageIndex: 0,
        pageSize,
        qfilter: filter,
        sorts: '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"}]',
        loperator: 'OR',
      });
    },
  }))
);
