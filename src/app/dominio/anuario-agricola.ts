import { Territorio } from './territorio';
import { Anuario } from './anuario';
import { Cultivo } from './cultivo';

export class AnuarioAgricola extends Anuario {
    constructor(
        public id?: number,
        public anio?: number,
        public ciclo?: string,
        public modalidad?: string,
        public catalogo?: string,
        public estado?: Territorio,
        public distrito?: Territorio,
        public municipio?: Territorio,
        public cultivo?: Cultivo,
    ) {
        super(anio);
    }
}
