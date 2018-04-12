import { Anuario } from './anuario';
import { Extent } from 'esri/geometry';

export class Territorio {
    constructor(
        public id_ent?: number,
        public id_ddr?: number,
        public id_mun?: number,
        public nombre?: string,
        public tipo?: string,
        public extent?: Extent,
        public features?: any,
    ) { }
}
