import { AnuarioAgricola } from "./anuario-agricola";
import { Cultivo } from "./cultivo";

export class DatatableMensaje {
    constructor(
        public data?: Array<Cultivo>,
        public fields?: Array<String>,
        public printableFields?: Array<String>,
        public consulta?: AnuarioAgricola
    ) { }
}