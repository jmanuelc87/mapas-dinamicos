import { Anuario } from "./Anuario";
import { Ciclo } from "./ciclo";
import { Cultivo } from "./cultivo";
import { Variedad } from "./variedad";
import { Modalidad } from "./modalidad";

export class AnuarioAgrícola extends Anuario {

    private ciclo: Ciclo;

    private modalidad: Modalidad;

    private cultivo: Cultivo;

    private variedad: Variedad;

    private sembrada: number;

    private cosechada: number;

    private siniestrada: number;

    private produccion: number;

    private rendimiento: number;

    private pmr: number;

    private valor: number;
}
