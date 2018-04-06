
export class ProduccionCultivo {

    constructor(
        public ciclos: string,
        public modalidad: string,
        public catalogo: string,
        public year: string,
        public state: number,
        public district: number,
        public municipio: number,
    ) { }
}