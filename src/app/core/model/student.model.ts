import { StudentModule } from "../../student/student.module";

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
    id: number;
    apellido: string;
    nombre: string;
    apellidoNombre: string;
    fechaNacimiento: Date;
    dni: number;
    cuil?: string;
    direccion?: string;
    planSocial?: boolean;
    trabaja?: boolean;      
    apellidoTutor?: string;
    nombreTutor?: string;
    estudioPrimarioTutor?: string;
    estudioSecundarioTutor?: string;
    estudioTerUnivTutor?: string;
    dniTutor?: number;
    cuilTutor?: string;
    telefono1?: string;
    telefono2?: string;
    fotoDni?: boolean;
    constanciaCuil?: boolean;
    constancia6grado?: boolean;
    actaNacimiento?: boolean;
    constanciaRegular?: boolean;
    foto4x4?: boolean;
    fotoCarnetVac?: boolean;
    fichaMedica?: boolean;
    aptitudFisica?: boolean;    
    grupoSanguineo?: boolean;
    fichaInscripcion?: boolean;
    libreta6grado?: boolean;
    fotocopiaLibroMatriz?: boolean;
    fotocopiaDniTutor?: boolean;
    constanciaCuilTutor?: boolean;
    localidad?: string; // Assuming Localidad is a string for simplicity
    parentescoTutor?: string; // Assuming ParentescoTutor is a string for simplicity
    

}