import { Anuario } from './anuario';
import { Extent } from 'esri/geometry';

export class Territorio {
    constructor(
        public id?: number,
        public nombre?: string,
        public tipo?: string,
        public extent?: Extent,
        public features?: any,
    ) { }
}
