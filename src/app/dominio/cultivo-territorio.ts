import { Territorio } from "./territorio";

export class CultivoTerritorio {
    constructor(
        public id?: number,
        public estado?: string,
        public distrito?: string,
        public municipio?: string,
        public sembrada?: number,
        public cosechada?: number,
        public siniestrada?: number,
        public produccion?: number,
        public rendimiento?: number,
        public pmr?: number,
        public valor?: number,
    ) { }
}
