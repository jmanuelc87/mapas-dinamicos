import { Cultivo } from "./cultivo";
import { Territorio } from "./territorio";

export class Estadistica {

    constructor(
        public idc: number,
        public cultivo: string,
        public ide: number,
        public territorio: string,
        public sembrada: string,
        public cosechada: string,
        public produccion: string,
        public valor: string,
    ) { }
}
