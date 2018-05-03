import { Territorio } from "./territorio";

export class CultivoTerritorio {
    constructor(
        public estado?: Territorio,
        public distrito?: Territorio,
        public municipio?: Territorio,
        public sembrada?: number,
        public cosechada?: number,
        public siniestrada?: number,
        public produccion?: number,
        public rendimiento?: number,
        public pmr?: number,
        public valor?: number,
    ) { }
}
