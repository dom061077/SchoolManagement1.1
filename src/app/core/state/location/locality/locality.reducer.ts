import { createCrudActions } from '@core/ngrx/action-factory';
import { Locality } from '@app/core/model/locality.model';
import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { createEntityReducer, CrudState } from '@app/core/ngrx';
import { LocalityActions} from './locality.actions';
import { createEntitySelectors } from '@app/core/ngrx/selectors-factory';


// 1. Define the Extended State Interface
export interface LocalityState extends CrudState<Locality> {
  provinces: any[];
  departments: any[];
  selectedProvinceId: number | string | null;
  selectedDepartmentId: number | string | null;
}


/** 
 * 2. DEFINE BASE CONSTANTS 
 * We call your factory here. This 'baseInitialState' is the one 
 * containing { ids: [], entities: {}, loading: false, etc. }
 */

//const { reducer, adapter, initialState } = createEntityReducer<Locality>(localityActions); esto es anterior a la extensión de los artifactos genéricos
const { 
  reducer: baseCrudReducer, 
  adapter, 
  initialState: baseInitialState 
} = createEntityReducer<Locality>(LocalityActions);









/** 
 * 3. DEFINE LOCALITY INITIAL STATE 
 * We merge the generic base with our new fields
 */
const initialState: LocalityState = {
  ...baseInitialState,
  provinces: [],
  departments: [],
  selectedProvinceId: null,
  selectedDepartmentId: null,
};


/** 
 * 4. SPECIALIZED REDUCER 
 * This only cares about the cascading logic
 */
const specializedReducer = createReducer(
  initialState,
  on(LocalityActions.selectProvince, (state, { provinceId }) => 
    adapter.removeAll({
      ...state,
      selectedProvinceId: provinceId,
      selectedDepartmentId: null,
      departments: [],
      loading: true
    })
  ),
  on(LocalityActions.loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments,
    loading: false
  })),
  on(LocalityActions.selectDepartment, (state, { departmentId }) => 
    adapter.removeAll({
      ...state,
      selectedDepartmentId: departmentId,
      loading: true
    })
  )
);


/** 
 * 5. THE FEATURE DEFINITION 
 * This is where we "compose" the base generic reducer and our specialized one.
 */
export const localityFeature = createFeature({
  name: 'localities', 
  reducer: (state: LocalityState | undefined, action: Action) => {
    // A) Let your generic factory handle standard CRUD (like loadAllSuccess)
    const stateAfterBase = baseCrudReducer(state, action) as LocalityState;
    
    // B) Let our specialized logic handle the cascade (like selectProvince)
    return specializedReducer(stateAfterBase, action);
  }
});


/** 
 * 6. SELECTORS 
 * We use your factory to get the generic ones, then export a unified object.
 */
const genericSelectors = createEntitySelectors<Locality>(
  localityFeature.name, 
  adapter
);

export const LocalitySelectors = {
  ...genericSelectors,
  ...localityFeature // This includes selectProvinces, selectDepartments, etc.
};

