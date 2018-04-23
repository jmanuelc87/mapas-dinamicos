import { Estado } from "./estado";
import { Municipio } from "./municipio";
import { Territorio } from "./territorio";
import { Anuario } from "./anuario";
import { Cultivo } from "./cultivo";



export class WebmapMensaje {
    constructor(
        public anuario?: Anuario,
        public cultivoId?: number,
        public territorio?: Array<Territorio>,
        public municipio?: Array<Municipio>,
        public color?: Array<number>
    ) { }
}