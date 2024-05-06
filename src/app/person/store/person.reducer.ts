import { createReducer, on } from "@ngrx/store";
import { PersonState, personAdapter } from "./person.state";
import { deletePERSONsuccess, loadPERSONsuccess, loadPERSONfail, updatePERSONsuccess, addPERSONsuccess, loadPERSONtotalrows } from "./person.actions";
import { Person } from "../person.model";


const _personReducer = createReducer(PersonState,
    on(loadPERSONsuccess, (state, action) => {
        return personAdapter.setAll(action.list,   {
            ...state,
            errormessage:'',
            isloading:false,
            
        });
    }),
    on(loadPERSONfail, (state, action) => {
        return { ...state, errormessage: action.errormessage }
    }),
    on(loadPERSONtotalrows, (state, action) => {
        return { ...state, totalRowsxxxx: action.totalRows }
    }),    
    on(addPERSONsuccess, (state, action) => {
        /*const _maxid = Math.max(...state.ids.map(item => item as number));
        const _newdata = { ...action.inputdata };
        _newdata.id = _maxid + 1;*/
        const person: Person ={
            
                id: 0,
                apellido: "",
                nombre: "",
                apellidoNombre: "",
                dni: 0,
                padre: "",
                madre: "",
                fechaNacimiento: new Date(),
                fechaBautismo: new Date(),
                fechaConfirmacion: new Date(),
                fechaMatrimonio: new Date(),
                apellidoPadrinoBaut: "",
                nroLibro: 0,
                nroFolio: 0,
                nombrePadrinoBaut: "",
                apellidoPadrinoConf: "",
                nombrePadrinoConf: "",
                apellidoMatrimonio: "",
                nombreMatrimonio: "",
                otrasNotas: "",            
        };
        return personAdapter.addOne(person, state);
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