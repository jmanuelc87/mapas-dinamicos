import { Anuario } from './anuario';
export class Territorio {
    constructor(
        public id?: number,
        public nombre?: string,
        public cultivo?: Array<Anuario>
    ) { }
}
