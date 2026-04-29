import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftaddeditComponent } from './shiftaddedit.component';

describe('ShiftaddeditComponent', () => {
  let component: ShiftaddeditComponent;
  let fixture: ComponentFixture<ShiftaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftaddeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
