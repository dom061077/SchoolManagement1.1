import { createReducer, on } from "@ngrx/store";
import { PersonState, personAdapter } from "./person.state";
import { deletePERSONsuccess, loadPERSONsuccess, loadPERSONfail, updatePERSONsuccess, addPERSONsuccess } from "./person.actions";


const _personReducer = createReducer(PersonState,
    on(loadPERSONsuccess, (state, action) => {
        return personAdapter.setAll(action.list, {
            ...state,
            errormessage:''
        });
    }),
    on(loadPERSONfail, (state, action) => {
        return { ...state, errormessage: action.errormessage }
    }),
    on(addPERSONsuccess, (state, action) => {
        const _maxid = Math.max(...state.ids.map(item => item as number));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;
        return personAdapter.addOne(_newdata, state);
    }),
    on(updatePERSONsuccess, (state, action) => {
        return personAdapter.updateOne(action.inputdata, state);
    }),
    on(deletePERSONsuccess, (state, action) => {
        return personAdapter.removeOne(action.code, state);
    })
)

export function PERSONreducer(state: any, action: any) {
    return _personReducer(state, action);
}