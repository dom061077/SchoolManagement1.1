import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE, MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AutocompleteDirective, AutocompletePanelComponent } from './directives/autocomplete.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { MaterialModule } from './material.module';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/min/locales';

// 'L' is the Moment.js token for a Localized Date (e.g., DD/MM/YYYY or MM/DD/YYYY)
export const DYNAMIC_LOCALE_FORMATS = {
  parse: {
    dateInput: 'L', // This forces the parser to use the locale's format
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [AutocompletePanelComponent, NumbersOnlyDirective],
  imports: [
    CommonModule,
    MaterialModule,
    //ReactiveFormsModule,
    //OverlayModule, Luego ivestigar para que es este módulo
    //PortalModule, Luego ivestigar para que es este módulo
    //AutocompleteDirective,
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: navigator.language },
    provideMomentDateAdapter(DYNAMIC_LOCALE_FORMATS),
  ],
  exports: [MaterialModule, NumbersOnlyDirective],
})
export class SharedModule {}
