


/*
    String apellido
    String nombre
    String apellidoNombre
    java.sql.Date fechaNacimiento

    int dni
    String cuil
    String direccion
    boolean planSocial=false
    boolean trabaja=false
    
    String apellidoTutor
    String nombreTutor
    EstudioEnum estudioPrimarioTutor
    EstudioEnum estudioSecundarioTutor
    EstudioEnum estudioTerUnivTutor
    
    int dniTutor
    String cuilTutor
    String telefono1
    String telefono2
    boolean fotoDni=false
    boolean constanciaCuil=false
    boolean constancia6grado=false
    boolean actaNacimiento=false
    boolean constanciaRegular=false
    boolean foto4x4=false
    boolean fotoCarnetVac=false
    boolean fichaMedica=false
    boolean aptitudFisica=false
    boolean grupoSanguineo=false
    boolean fichaInscripcion=false
    boolean libreta6grado=false
    boolean fotocopiaLibroMatriz=false
    boolean fotocopiaDniTutor=false
    boolean constanciaCuilTutor=false
    
    Localidad localidad
    ParentescoTutor parentescoTutor

*/
export interface Student {
    //Datos Personales
    id: number;
    lastName: string;
    firstName: string;
    birthDate: Date;
    dni: number | null;
    cuil?: string;
    direccion?: string;
    planSocial?: boolean;
    trabaja?: boolean;      
    localidad?: string; // Assuming Localidad is a string for simplicity
    telefono1?: string;
    telefono2?: string;    

    //Documentación personal
    fotoDni?: boolean;
    constanciaCuil?: boolean;
    constancia6grado?: boolean;
    actaNacimiento?: boolean;
    constanciaRegular?: boolean;
    foto4x4?: boolean;

    //Documentacion adicional
    fotoCarnetVac?: boolean;
    fichaMedica?: boolean;
    aptitudFisica?: boolean;    
    grupoSanguineo?: boolean;
    fichaInscripcion?: boolean;
    libreta6grado?: boolean;
    fotocopiaLibroMatriz?: boolean;




    //Datos Tutor
    apellidoTutor?: string;
    nombreTutor?: string;
    estudioPrimarioTutor?: string;
    estudioSecundarioTutor?: string;
    estudioTerUnivTutor?: string;
    dniTutor?: number | null;
    cuilTutor?: string;
    fotocopiaDniTutor?: boolean;
    constanciaCuilTutor?: boolean;
    parentescoTutor?: string; // Assuming ParentescoTutor is a string for simplicity



    

}

