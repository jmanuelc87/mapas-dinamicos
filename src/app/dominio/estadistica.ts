import { Cultivo } from "./cultivo";
import { Territorio } from "./territorio";

export class Estadistica {

    constructor(
        public cultivo?: Cultivo,
        public territorio?: Territorio,
    ) { }
}
