import { createEntityAdapter } from "@ngrx/entity";
import { Person, PersonModel } from "../person.model";


export const personAdapter=createEntityAdapter<Person>({
    selectId:(person:Person)=>person.id,
    sortComparer:sortbyName
});

export const PersonState:PersonModel=personAdapter.getInitialState({
    errormessage:'',
    isloading:false,
    totalRows:0

});

export function sortbyName(a:Person,b:Person){
    return a.apellido.localeCompare(b.apellido);
}