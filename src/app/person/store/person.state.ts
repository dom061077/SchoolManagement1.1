import { createEntityAdapter } from "@ngrx/entity";
import { Person, PersonModel } from "../person.model";


export const personAdapter=createEntityAdapter<Person>({
    selectId:(customer:Person)=>customer.id,
    sortComparer:sortbyName
});

export const PersonState:PersonModel=personAdapter.getInitialState({
    errormessage:'',
    isloading:false
});

export function sortbyName(a:Person,b:Person){
    return a.apellidoNombre.localeCompare(b.apellidoNombre);
}