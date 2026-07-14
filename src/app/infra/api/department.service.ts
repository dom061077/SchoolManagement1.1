import { Injectable } from '@angular/core';
import { Department } from '@app/core/model/department.model';
import { PersistenceService } from './persistence.service';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends PersistenceService<Department> {
  protected override baseUrl = config.apiUrl + '/departamento';

}
