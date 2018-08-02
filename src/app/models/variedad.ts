export class Variedad {

    private id: number;

    private nombre: string;


    /**
     * Getter $id
     * @return {number}
     */
    public get Id(): number {
        return this.id;
    }

    /**
     * Getter $nombre
     * @return {string}
     */
    public get Nombre(): string {
        return this.nombre;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set Id(value: number) {
        this.id = value;
    }

    /**
     * Setter $nombre
     * @param {string} value
     */
    public set Nombre(value: string) {
        this.nombre = value;
    }

}
