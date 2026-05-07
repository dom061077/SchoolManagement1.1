import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRegistrationListingComponent } from './student-registration-listing/student-registration-listing.component';
import { StudentRegistrationRoutingModule } from './student-registration-routing.module';
import { MaterialModule } from '../shared/material.module';
import { StudentRegistrationAddEditComponent } from './student-registration-add-edit/student-registration-add-edit.component';
import { StoreModule } from '@ngrx/store';
import { studentRegistrationFeature } from '../../core/state/student-registration/student-registration-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentRegistrationEffects } from '../../core/state/student-registration/student-registration-effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { SharedModule } from '../shared/shared.module';
import { shiftFeature } from '@app/core/state/shift/shift.reducer';
import { ShiftEffects } from '@app/core/state/shift/shift.effects';
import { NgSelectModule } from "@ng-select/ng-select";
import { StudentEffects } from '@app/core/state/student/student-effects';
import { studentFeature } from '@app/core/state/student/student-reducer';
import { academicYearFeature } from '@app/core/state/academicyear/academic-year.reducer';
import { AcademicYearEffects } from '@app/core/state/academicyear/academic-year.effects';
import { gradeLevelFeature } from '@app/core/state/grade-level/grade-level.reducer';
import { GradeLevelEffects } from '@app/core/state/grade-level/grade-level.effects';

@NgModule({
  declarations: [
    StudentRegistrationListingComponent,
    StudentRegistrationAddEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(studentRegistrationFeature.name, studentRegistrationFeature.reducer),
    EffectsModule.forFeature([StudentRegistrationEffects]),
    StoreModule.forFeature(shiftFeature.name, shiftFeature.reducer),
    EffectsModule.forFeature([ShiftEffects]),
    StoreModule.forFeature(studentFeature.name, studentFeature.reducer),
    EffectsModule.forFeature([StudentEffects]),
    StoreModule.forFeature(academicYearFeature.name, academicYearFeature.reducer),
    EffectsModule.forFeature([AcademicYearEffects]),
    StoreModule.forFeature(gradeLevelFeature.name, gradeLevelFeature.reducer),
    EffectsModule.forFeature([GradeLevelEffects]),
    MaterialModule,
    StudentRegistrationRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgSelectModule
  ]
})
export class StudentRegistrationModule { }
