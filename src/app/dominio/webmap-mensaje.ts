import { Estado } from "./estado";
import { Municipio } from "./municipio";



export class WebmapMensaje {
    constructor(
        public estado?: Estado,
        public municipio?: Array<Municipio>,
        public color?: string
    ) { }
}