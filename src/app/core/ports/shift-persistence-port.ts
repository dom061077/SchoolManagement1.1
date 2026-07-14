import { InjectionToken } from '@angular/core';
import { IPersistencePort } from './persistence-port';
import { Shift } from '../model/shift.model';

export const SHIFT_PERSISTENCE_PORT = new InjectionToken<IPersistencePort<Shift, number, string, any>>(
  'SHIFT_PERSISTENCE_PORT'
);
