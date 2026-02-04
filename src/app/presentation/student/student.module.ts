import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from '../shared/material.module';
import { StudentaddeditComponent } from './studentaddedit/studentaddedit.component';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from '../../core/state/student/student-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../../core/state/student/student-effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { MatStepperModule } from '@angular/material/stepper';
import { NumbersOnlyDirective } from '../shared/directives/numbers-only.directive';
import { SharedModule } from '../shared/shared.module';
import { estudioenumFeature } from '../../core/state/estudioenum/estudioenum.reducer';
import { EstudioenumEffects } from '../../core/state/estudioenum/estudioenum.effects';
import { ClearableSelectDirective } from '../shared/directives/clearable-select.directive';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    StudentlistingComponent,
    StudentaddeditComponent
    //NumbersOnlyDirective
  ],
  imports: [
    CommonModule,
    NgxMaskDirective, NgxMaskPipe,
    SharedModule,
    NgSelectModule,
    ClearableSelectDirective,
    StoreModule.forFeature(studentFeature.name, studentFeature.reducer),
    StoreModule.forFeature(estudioenumFeature.name, estudioenumFeature.reducer),
    EffectsModule.forFeature([StudentEffects, EstudioenumEffects])  ,  
    MatStepperModule,
    StudentRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),    
  ],
  providers: [
    provideNgxMask()
  ]
})
export class StudentModule { }
