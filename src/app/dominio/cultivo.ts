import { Variedad } from "./variedad";
import { Territorio } from "./territorio";

export class Cultivo {
    constructor(
        public id?: number,
        public idvariedad?: number,
        public nombre?: string,
        public sembrada?: number,
        public cosechada?: number,
        public produccion?: number,
        public rendimiento?: number,
        public pmr?: number,
        public valor?: number,
        public variedad?: string,
    ) { }
}
