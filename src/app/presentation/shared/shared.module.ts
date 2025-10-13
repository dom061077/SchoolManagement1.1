import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AutocompleteDirective, AutocompletePanelComponent } from '../../presentation/shared/autocomplete.directive';

@NgModule({
  declarations: [AutocompletePanelComponent],
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
