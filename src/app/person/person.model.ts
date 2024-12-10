import { EntityState } from "@ngrx/entity";

/**
 
    private Long id;
    
    String apellido;
    String nombre;
    int dni;
    String padre;
    String madre;
    java.sql.Date fechaNacimiento;
    java.sql.Date fechaBautismo;
    java.sql.Date fechaConfirmacion;
    java.sql.Date fechaMatrimonio;

    int nroLibro;
    int nroFolio;
    String apellidoPadrinoBaut;
    String nombrePadrinoBaut;
    String apellidoPadrinoConf;
    String nombrePadrinoConf;
    String apellidoMatrimonio;
    String nombreMatrimonio;
    String otrasNotas;

 */
export interface Person{
    id: number,
    apellido: string,
    nombre: string,
    apellidoNombre: string,
    dni: number,
    padre: string,
    madre: string,
    fechaNacimiento: Date,
    fechaBautismo: Date,
    fechaConfirmacion: Date,
    fechaMatrimonio: Date,
    nroLibro: number,
    nroFolio: number,
    apellidoPadrinoBaut: string,
    nombrePadrinoBaut: string,
    apellidoPadrinoConf: string,
    nombrePadrinoConf: string,
    apellidoMatrimonio: string,
    nombreMatrimonio: string,
    otrasNotas: string     
}

export interface PersonModel extends EntityState<Person>{
    errormessage:string,
    isloading:boolean,
    totalRows:number
}

