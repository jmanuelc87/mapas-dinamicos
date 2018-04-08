import { Territorio } from './territorio';
import { Anuario } from './anuario';

export class AnuarioAgricola extends Anuario {
    constructor(
        public anio: number,
        public ciclo: string,
        public modalidad: string,
        public catalogo: string,
        public estado: Territorio,
        public distrito: Territorio,
        public municipio: Territorio,
        public id?: number,
    ) {
        super(anio);
     }
}
