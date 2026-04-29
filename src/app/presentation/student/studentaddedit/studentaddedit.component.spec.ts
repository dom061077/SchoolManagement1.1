import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentaddeditComponent } from './studentaddedit.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StudentFacade } from '../../../core/state/student/student.facade';
import { ProvinceFacade } from '@app/core/state/location/province/province.facade';
import { LocaltyFacade } from '@app/core/state/location/locality/locality.facade';
import { EstudioEnumFacade } from '../../../core/state/estudioenum/estudioenum.facade';
import { UiService } from '../../shared/ui.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

describe('StudentaddeditComponent', () => {
  let component: StudentaddeditComponent;
  let fixture: ComponentFixture<StudentaddeditComponent>;

  // Mocks
  const mockStudentFacade = {
    create: jasmine.createSpy('create'),
    update: jasmine.createSpy('update'),
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockProvinceFacade = {
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockLocaltyFacade = {
    loadAll: jasmine.createSpy('loadAll'),
    selectProvince: jasmine.createSpy('selectProvince'),
    selectDepartment: jasmine.createSpy('selectDepartment')
  };

  const mockEstudioEnumFacade = {
    loadAll: jasmine.createSpy('loadAll')
  };

  const mockTranslateService = {
    instant: jasmine.createSpy('instant').and.returnValue('Translated Title'),
    get: jasmine.createSpy('get').and.returnValue(of('Translated Title')),
    // The pipe subscribes to these three events on init
    onTranslationChange: new EventEmitter(),
    onLangChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  };

  const mockMatDialogRef = {
    close: jasmine.createSpy('close')
  };

  const mockMatDialog = {
    open: jasmine.createSpy('open')
  };

  const mockStore = {
    selectSignal: jasmine.createSpy('selectSignal').and.returnValue(() => []),
    dispatch: jasmine.createSpy('dispatch')
  };

  const mockUiService = {
    getDateFormat: jasmine.createSpy('getDateFormat').and.returnValue('dd/MM/yyyy')
  };

  beforeEach(async () => {
    // Modify mockStore behavior for specific selectors if necessary
    mockStore.selectSignal.and.callFake((selector: any) => {
      return () => []; // default signal returning an empty array
    });

    await TestBed.configureTestingModule({
      declarations: [StudentaddeditComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        NgSelectModule,
        FormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        NgxMaskDirective,
        NgxMaskPipe
      ],
      providers: [
        provideNgxMask(),
        FormBuilder,
        { provide: StudentFacade, useValue: mockStudentFacade },
        { provide: ProvinceFacade, useValue: mockProvinceFacade },
        { provide: LocaltyFacade, useValue: mockLocaltyFacade },
        { provide: EstudioEnumFacade, useValue: mockEstudioEnumFacade },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { code: 0, title: 'STUDENT.ADD_STUDENT', readOnly: false, toDelete: false } },
        { provide: Store, useValue: mockStore },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: UiService, useValue: mockUiService }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StudentaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate forms when editcode > 0', () => {
    // Setup for edit scenario
    component.data = { code: 1, title: 'STUDENT.ADD_STUDENT', readOnly: false, toDelete: false } as any;
    const mockStudent = { id: 1, lastName: 'Perez', firstName: 'Juan' };
    spyOn(component, 'populateForms');

    // Simulate selectEntities returning a mock student dictionary
    component.selectEntities = (() => ({ 1: mockStudent })) as any;

    component.ngOnInit();

    expect(component.populateForms).toHaveBeenCalledWith(mockStudent as any);
  });

  it('should transform raw data to student properly', () => {
    const rawData = {
      id: '1',
      lastName: 'Doe',
      firstName: 'John',
      birthDate: '2000-01-01',
      dni: '12345678',
      localidadId: '10',
      departamentoId: '20',
      provinciaId: '30'
    };

    const student = component.transformRawDataToStudent(rawData);
    expect(student.id).toBe(1);
    expect(student.lastName).toBe('Doe');
    expect(student.firstName).toBe('John');
    expect(student.dni).toBe(12345678);
    expect(student.localidadId).toBe(10);
    expect(student.departamentoId).toBe(20);
    expect(student.provinciaId).toBe(30);
  });

  it('should transform student to raw data properly', () => {
    const student = {
      id: 1,
      lastName: 'Doe',
      firstName: 'John',
      birthDate: new Date('2000-01-01T00:00:00Z'),
      dni: 12345678,
      localidadId: 10,
      departamentoId: 20,
      provinciaId: 30,
      fotoDni: true,
      constanciaCuil: false,
      dniTutor: 87654321
    } as any;

    const rawData = component.transformStudentToRawData(student);
    
    expect(rawData['id']).toBe('1');
    expect(rawData['lastName']).toBe('Doe');
    expect(rawData['firstName']).toBe('John');
    expect(rawData['birthDate']).toEqual(new Date('2000-01-01T00:00:00Z'));
    expect(rawData['dni']).toBe('12345678');
    expect(rawData['localidadId']).toBe(10);
    expect(rawData['departamentoId']).toBe(20);
    expect(rawData['provinciaId']).toBe(30);
    expect(rawData['fotoDni']).toBe(true);
    expect(rawData['constanciaCuil']).toBe(false);
    expect(rawData['dniTutor']).toBe('87654321');
  });

  it('should call facade create on submit if editcode is 0 and forms are valid', () => {
    component.editcode = 0;

    // Setup valid form
    component.personalDataForm.patchValue({
      lastName: 'Smith',
      firstName: 'Jane',
      birthDate: '2000-01-01',
      dni: '12345678'
    });

    component.onSubmit();

    expect(mockStudentFacade.create).toHaveBeenCalled();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call facade update on submit if editcode > 0 and forms are valid', () => {
    component.editcode = 1;

    // Setup valid form
    component.personalDataForm.patchValue({
      lastName: 'Smith',
      firstName: 'Jane',
      birthDate: '2000-01-01',
      dni: '12345678'
    });

    component.onSubmit();

    expect(mockStudentFacade.update).toHaveBeenCalled();
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call loadAll on relevant facades during ngOnInit', () => {
    component.ngOnInit();
    expect(mockEstudioEnumFacade.loadAll).toHaveBeenCalledWith(0, 100, '[]', '[]', 'AND');
    expect(mockLocaltyFacade.loadAll).toHaveBeenCalledWith(0, 100, '[]', '[]', 'AND');
    expect(mockProvinceFacade.loadAll).toHaveBeenCalledWith(0, 100, '[]', '[]', 'AND');
  });

  it('should dispatch selectProvince via localityFacade when province changes', () => {
    component.localitySelect = { clearModel: jasmine.createSpy('clearModel') };
    component.departmentSelect = { clearModel: jasmine.createSpy('clearModel') };
    
    component.onProvinceChange({ id: 10, nombre: 'Test Province' } as any);
    
    expect(mockLocaltyFacade.selectProvince).toHaveBeenCalledWith(10);
    expect(component.localitySelect.clearModel).toHaveBeenCalled();
    expect(component.departmentSelect.clearModel).toHaveBeenCalled();
    expect(component.personalDataForm.get('localidadId')?.value).toBeNull();
  });

  it('should dispatch selectProvince(0) via localityFacade when province is cleared', () => {
    component.localitySelect = { clearModel: jasmine.createSpy('clearModel') };
    component.departmentSelect = { clearModel: jasmine.createSpy('clearModel') };
    
    component.onProvinceChange(null as any);
    
    expect(mockLocaltyFacade.selectProvince).toHaveBeenCalledWith(0);
  });

  it('should dispatch selectDepartment via localityFacade when department changes', () => {
    component.localitySelect = { clearModel: jasmine.createSpy('clearModel') };
    
    component.onDepartmentChange({ id: 20, nombre: 'Test Dept' } as any);
    
    expect(mockLocaltyFacade.selectDepartment).toHaveBeenCalledWith(20);
    expect(component.localitySelect.clearModel).toHaveBeenCalled();
  });
});
