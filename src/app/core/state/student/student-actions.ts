import { createCrudActions } from '../../ngrx/action-factory';
import { Student } from '../../model/student.model'
import { createAction, props } from '@ngrx/store';

export const studentCrudActions = createCrudActions<Student>('Student');

export const searchStudents = createAction('[Student] Search Students', props<{ dni: number, lastName: string, firstName: string, pageIndex: number, pageSize: number }>());

export const searchStudentsSuccess = createAction('[Student] Search Students Success', props<{ students: Student[], total: number }>());

export const searchStudentsFailure = createAction('[Student] Search Students Failure', props<{ error: any }>());

export const searchStudentsClear = createAction('[Student] Search Students Clear');


export const StudentActions = {
    ...studentCrudActions,
    searchStudents,
    searchStudentsSuccess,
    searchStudentsFailure,
    searchStudentsClear
}