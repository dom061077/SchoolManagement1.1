import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentaddeditComponent } from './studentaddedit.component';

describe('StudentaddeditComponent', () => {
  let component: StudentaddeditComponent;
  let fixture: ComponentFixture<StudentaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentaddeditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
