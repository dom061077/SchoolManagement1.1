import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftlistingComponent } from './shiftlisting/shiftlisting.component';
import { ShiftaddeditComponent } from './shiftaddedit/shiftaddedit.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { shiftFeature } from '../../core/state/shift/shift.reducer';
import { ShiftEffects } from '../../core/state/shift/shift.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../../app.module';

@NgModule({
  declarations: [
    ShiftlistingComponent,
    ShiftaddeditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShiftRoutingModule,
    MaterialModule,
    StoreModule.forFeature(shiftFeature.name, shiftFeature.reducer),
    EffectsModule.forFeature([ShiftEffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: false
    }),
  ]
})
export class ShiftModule { }
