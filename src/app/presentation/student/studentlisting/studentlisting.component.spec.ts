import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlistingComponent } from './studentlisting.component';

describe('StudentlistingComponent', () => {
  let component: StudentlistingComponent;
  let fixture: ComponentFixture<StudentlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentlistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
