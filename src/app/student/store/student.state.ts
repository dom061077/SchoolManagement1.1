
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Student } from '../student.model';

export interface StudentState extends EntityState<Student> {
    errormessage: string;
    isloading: boolean;
    totalRows: number;
}

export const studentAdapter = createEntityAdapter<Student>({    
    selectId: (student: Student) => student.id,
});

export const StudentState: StudentState = studentAdapter.getInitialState({
    errormessage: '',
    isloading: false,
    totalRows: 0
});

