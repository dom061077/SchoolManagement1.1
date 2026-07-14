import { TestBed } from '@angular/core/testing';

import { TipoExamenService } from './tipo-examen.service';

describe('TipoExamenService', () => {
  let service: TipoExamenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoExamenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
