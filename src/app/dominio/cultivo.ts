import { Variedad } from "./variedad";

export class Cultivo {
    constructor(
        public id?: number,
        public nombre?: string,
        public variedades?: Array<Variedad>
    ) { }
}
