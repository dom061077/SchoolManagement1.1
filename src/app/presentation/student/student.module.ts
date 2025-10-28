import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentlistingComponent } from './studentlisting/studentlisting.component';
import { StudentRoutingModule } from './student-routing.module';
import { MaterialModule } from '../../material.module';
import { StudentaddeditComponent } from './studentaddedit/studentaddedit.component';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from '../../core/state/student/student-reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../../core/state/student/student-effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    StudentlistingComponent,
    StudentaddeditComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    StoreModule.forFeature(studentFeature.name, studentFeature.reducer),
    EffectsModule.forFeature([StudentEffects])  ,  
    MaterialModule,
    StudentRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),    
  ]
})
export class StudentModule { }
