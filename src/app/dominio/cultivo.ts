import { Variedad } from "./variedad";

export class Cultivo {
    constructor(
        public id?: number,
        public nombre?: string,
        public sembrada?: number,
        public cosechada?: number,
        public produccion?: number,
        public rendimiento?: number,
        public pmr?: number,
        public valor?: number,
        public variedades?: Array<Variedad>
    ) { }
}
