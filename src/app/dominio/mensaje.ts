import { Territorio } from "./territorio";


export class Mensaje {
    constructor(
        public municipio?: Territorio,
        public entidad?: Territorio
    ) { }
}