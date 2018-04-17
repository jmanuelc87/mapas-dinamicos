import { Estado } from "./estado";
import { Municipio } from "./municipio";
import { Territorio } from "./territorio";



export class WebmapMensaje {
    constructor(
        public territorio?: Array<Territorio>,
        public municipio?: Array<Municipio>,
        public color?: string
    ) { }
}