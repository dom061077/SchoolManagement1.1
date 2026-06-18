import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase } from '../../ngrx/facade-base';
import { Student } from '../../model/student.model';
import { StudentActions } from '../../state/student/student-actions';
import { studentSelectors } from '../../state/student/student-reducer';
import { EntityState } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class StudentFacade extends FacadeBase<Student> {
  constructor(store: Store<{ feature: EntityState<Student> }>) {
    super(store, StudentActions, studentSelectors);
  }

  searchStudents(term: string, pageSize: number) {
    let studentPageSize = 100;
    let filter = '[]';
    let firstName = '';
    let filterObj = [];
    let termValues = term.split(' ');

    termValues.forEach(value => {
      if (filterObj.length == 0) {
        if (Number.isInteger(Number(value))) {
          filterObj.push({ property: "dni:eq", value: value });
        } else {
          filterObj.push({ property: "lastName:like", value: value });
        }
      } else {
        firstName += value + ' ';
      }
    });
    if (firstName.trim() && filterObj.length > 0) {
      filterObj.push({ property: "firstName:like", value: firstName.trim() });
    }
    if (!term.trim()) {
      filterObj = [];
    }
    filter = JSON.stringify(filterObj);
    this.loadAll(0, studentPageSize, filter, '[{"property": "lastName","value": "ASC"},{"property": "firstName","value": "ASC"} ]', 'OR');

  }



}