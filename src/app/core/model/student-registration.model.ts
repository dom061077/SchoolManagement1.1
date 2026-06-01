export interface StudentRegistration {
    id: number;
    studentId?: number;
    studentDni?: number;
    studentLastName?: string;
    studentFirstName?: string;

    academicYearId?: number;
    academicYearYear?: number;

    gradeLevelId?: number;
    gradeLevelGradeNumber?: number;

    shiftId?: number;
    shiftName?: string;

    sectionId?: number;
    sectionName?: string;
}
