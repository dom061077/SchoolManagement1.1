import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonlistingComponent } from './personlisting.component';

describe('PersonlistingComponent', () => {
  let component: PersonlistingComponent;
  let fixture: ComponentFixture<PersonlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonlistingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
