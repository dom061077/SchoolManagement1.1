import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftlistingComponent } from './shiftlisting/shiftlisting.component';

const routes: Routes = [{ path: '', component: ShiftlistingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }
