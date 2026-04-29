import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftlistingComponent } from './shiftlisting.component';

describe('ShiftlistingComponent', () => {
  let component: ShiftlistingComponent;
  let fixture: ComponentFixture<ShiftlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftlistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
