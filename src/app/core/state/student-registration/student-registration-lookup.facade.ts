import { computed, Injectable } from "@angular/core";
import { AcademicYearFacade } from "../academicyear/academic-year.facade";
import { GradeLevelFacade } from "../grade-level/grade-level.facade";
import { SectionFacade } from "../section/section.facade";
import { ShiftFacade } from "../shift/shift.facade";
import { Signal } from "@angular/core";
import { Shift } from "../../model/shift.model";
import { AcademicYear } from "../../model/academic-year.model";
import { GradeLevel } from "../../model/grade-level.model";
import { Section } from "../../model/section.model";
import { Student } from "@app/core/model/student.model";
import { StudentFacade } from "@app/core/state/student/student.facade";

@Injectable({ providedIn: 'root' })
//Composition Pattern (Facade-injects-Facades).
export class StudentRegistrationLookupFacade {
    readonly shifts: Signal<Shift[]> = this.shiftFacade.items;
    readonly academicYears: Signal<AcademicYear[]> = this.academicYearFacade.items;
    readonly gradeLevels: Signal<GradeLevel[]> = this.gradeLevelFacade.items;
    readonly sections: Signal<Section[]> = this.sectionFacade.items;
    readonly students: Signal<Student[]> = this.studentFacade.items;

    readonly loading = computed(() =>
        this.shiftFacade.loading() ||
        this.academicYearFacade.loading() ||
        this.gradeLevelFacade.loading() ||
        this.sectionFacade.loading() ||
        this.studentFacade.loading()
    );

    constructor(
        private shiftFacade: ShiftFacade,
        private academicYearFacade: AcademicYearFacade,
        private gradeLevelFacade: GradeLevelFacade,
        private sectionFacade: SectionFacade,
        private studentFacade: StudentFacade
    ) { }

    loadAllLookups(pageIndex = 0, pageSize = 1000): void {
        this.shiftFacade.loadAll(pageIndex, pageSize, '[]', '[]', 'AND');
        this.academicYearFacade.loadAll(pageIndex, pageSize, '[]', '[]', 'AND');
        this.gradeLevelFacade.loadAll(pageIndex, pageSize, '[]', '[]', 'AND');
        this.sectionFacade.loadAll(pageIndex, pageSize, '[]', '[]', 'AND');
        this.studentFacade.loadAll(pageIndex, pageSize, '[]', '[]', 'AND');
    }


}