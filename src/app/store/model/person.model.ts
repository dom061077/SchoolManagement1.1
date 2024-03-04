export interface Person{
    id: number,
    apellido: string,
    nombre: string,
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