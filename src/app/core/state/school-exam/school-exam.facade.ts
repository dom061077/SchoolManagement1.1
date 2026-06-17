import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacadeBase } from '../../ngrx/facade-base';
import { SchoolExam } from '../../model/school-exam.model';
import { schoolExamActions } from './school-exam-actions';
import { schoolExamSelectors } from './school-exam-reducer';
import { EntityState } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class SchoolExamFacade extends FacadeBase<SchoolExam> {
  constructor(store: Store<{ feature: EntityState<SchoolExam> }>) {
    super(store, schoolExamActions, schoolExamSelectors);
  }
}
