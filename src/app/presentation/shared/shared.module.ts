import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AutocompleteDirective, AutocompletePanelComponent } from './directives/autocomplete.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [AutocompletePanelComponent, NumbersOnlyDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatOptionModule,
    OverlayModule,
    PortalModule,
    AutocompleteDirective,
  ],
  exports: [AutocompleteDirective],
})
export class SharedModule {}
