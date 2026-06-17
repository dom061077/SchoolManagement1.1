export interface SchoolExamDetail {
    id: number;
    schoolExamId?: number;
    academicPeriodId?: number;
    score?: number;
    studentRegistrationId?: number;
    studentName?: string;
}

export interface SchoolExam {
    id: number;
    name: string;
    description?: string;
    date: string; // ISO format date: YYYY-MM-DD
    tipoExamenId: number;
    tipoExamenName?: string;
    academicPeriodId: number;
    subjectId: number;
    subjectName?: string;
    teacherId: number;
    details?: SchoolExamDetail[];
}
