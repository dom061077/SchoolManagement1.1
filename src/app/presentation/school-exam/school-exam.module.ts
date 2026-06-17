import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolExamListingComponent } from './school-exam-listing/school-exam-listing.component';
import { SchoolExamRoutingModule } from './school-exam-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SchoolExamAddEditComponent } from './school-exam-add-edit/school-exam-add-edit.component';
import { StoreModule } from '@ngrx/store';
import { schoolExamFeature } from '../../core/state/school-exam/school-exam-reducer';
import { EffectsModule } from '@ngrx/effects';
import { SchoolExamEffects } from '../../core/state/school-exam/school-exam-effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { SharedModule } from '../shared/shared.module';
import { studentRegistrationFeature } from '../../core/state/student-registration/student-registration-reducer';
import { StudentRegistrationEffects } from '../../core/state/student-registration/student-registration-effects';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SchoolExamListingComponent,
    SchoolExamAddEditComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    StoreModule.forFeature(schoolExamFeature.name, schoolExamFeature.reducer),
    EffectsModule.forFeature([SchoolExamEffects]),
    StoreModule.forFeature(studentRegistrationFeature.name, studentRegistrationFeature.reducer),
    EffectsModule.forFeature([StudentRegistrationEffects]),
    MaterialModule,
    SchoolExamRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ]
})
export class SchoolExamModule { }
