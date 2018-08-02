export class Cultivo {

    private id: number;

    private nombre: string;

    public set Id(v: number) {
        this.id = v;
    }

    public get Id(): number {
        return this.id;
    }

    public set Nombre(v: string) {
        this.nombre = v;
    }

    public get Nombre(): string {
        return this.nombre;
    }

}
