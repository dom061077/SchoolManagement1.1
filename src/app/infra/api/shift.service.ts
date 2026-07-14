import { Injectable } from '@angular/core';
import { config } from './config';
import { Shift } from '../../core/model/shift.model';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService extends PersistenceService<Shift> {
  protected override baseUrl = config.apiUrl + '/shift';
}
