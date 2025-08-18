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

/* asi se vería un ejemplo de estado inicial para PersonModel
// This is an example of how the initial state for PersonModel might look like
This is your state snapshot:

ids → [1, 2] keeps order.

entities → dictionary of persons, keyed by id.

interface EntityState<T> {
  ids: string[] | number[];   // array of entity IDs, in order
  entities: { [id: string]: T }; // dictionary of entity objects
}

errormessage, isloading, totalRows → your extra UI-related field
const personState: PersonModel = {
  ids: [1, 2],
  entities: {
    1: {
      id: 1,
      apellido: "García",
      nombre: "Ana",
      apellidoNombre: "García Ana",
      dni: 12345678,
      padre: "Juan García",
      madre: "María López",
      fechaNacimiento: new Date("1990-01-01"),
      fechaBautismo: new Date("1990-02-01"),
      fechaConfirmacion: new Date("2000-03-01"),
      fechaMatrimonio: null,
      nroLibro: 1,
      nroFolio: 5,
      apellidoPadrinoBaut: "Fernández",
      nombrePadrinoBaut: "Carlos",
      apellidoPadrinoConf: "Martínez",
      nombrePadrinoConf: "Lucía",
      apellidoMatrimonio: "",
      nombreMatrimonio: "",
      otrasNotas: ""
    },
    2: {
      id: 2,
      apellido: "Martínez",
      nombre: "Luis",
      apellidoNombre: "Martínez Luis",
      dni: 87654321,
      padre: "Pedro Martínez",
      madre: "Laura Díaz",
      fechaNacimiento: new Date("1985-05-10"),
      fechaBautismo: new Date("1985-06-10"),
      fechaConfirmacion: new Date("1995-07-20"),
      fechaMatrimonio: new Date("2015-08-15"),
      nroLibro: 2,
      nroFolio: 10,
      apellidoPadrinoBaut: "Gómez",
      nombrePadrinoBaut: "Miguel",
      apellidoPadrinoConf: "Pérez",
      nombrePadrinoConf: "Sofía",
      apellidoMatrimonio: "Torres",
      nombreMatrimonio: "Mariana",
      otrasNotas: "Casado en Buenos Aires"
    }
  },
  errormessage: "",        // no error
  isloading: false,        // finished loading
  totalRows: 2             // backend said there are 2 total records
};

*/