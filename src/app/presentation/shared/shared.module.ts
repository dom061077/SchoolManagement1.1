import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AutocompleteDirective, AutocompletePanelComponent } from './directives/autocomplete.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AutocompletePanelComponent, NumbersOnlyDirective],
  imports: [
    CommonModule,
    //MaterialModule,
    //ReactiveFormsModule,
    //OverlayModule, Luego ivestigar para que es este módulo
    //PortalModule, Luego ivestigar para que es este módulo
    //AutocompleteDirective,
  ],
  exports: [MaterialModule, NumbersOnlyDirective],
})
export class SharedModule {}
