import { AnuarioAgricola } from "../dominio/anuario-agricola";

export class ServiceUtil {

    public static queryTaskWhere(field: string, start: number, end: number, lenght: number) {
        let where = `${field} IN (`;
        let array = [];

        for (let i = start; i <= end; i++) {
            array.push(i);
        }

        where += this.getStringFromArray(array, lenght);
        where += ')';

        return where;
    }

    public static getCVEString(cve: number, length: number): string {
        let format = '';
        for (let i = format.length; i < length - cve.toString().length; i++) {
            format += '0';
        }
        return format + cve.toString();
    }


    public static getStringFromArray(array: number[], lenght: number): string {
        let format = '';
        let integer;

        for (let i = 0; i < array.length - 1; i++) {
            integer = this.getCVEString(array[i], lenght);
            format += `'${integer}',`;
        }

        integer = this.getCVEString(array[array.length - 1], lenght);
        format += `'${integer}'`;

        return format;
    }


    public static buildFieldsConsultaCultivo(obj: AnuarioAgricola): string[] {

        if (obj.catalogo !== undefined && obj.catalogo === 'detalle') {
            return ['Cultivo', 'Tipo/Variedad', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Producción (Ton)', 'Rendimiento (Ton/Ha)', 'PMR ($/Ton)', 'Valor Producción (Miles de pesos)'];
        } else {
            return ['Cultivo', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Producción (Ton)', 'Rendimiento (Ton/Ha)', 'PMR ($/Ton)', 'Valor Producción (Miles de pesos)'];
        }
    }


    public static buildPrintableFieldsConsultaCultivo(obj: AnuarioAgricola): string[] {

        if (obj.catalogo !== undefined && obj.catalogo === 'detalle') {
            return ['nombre', 'variedad', 'sembrada', 'cosechada', 'produccion', 'rendimiento', 'pmr', 'valor'];
        } else {
            return ['nombre', 'sembrada', 'cosechada', 'produccion', 'rendimiento', 'pmr', 'valor'];
        }
    }

}
