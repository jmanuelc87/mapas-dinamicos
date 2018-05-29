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
            return ['Cultivo', 'Tipo/Variedad', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Sup. Siniestrada (Ha)', 'Producción (Ton)', 'Rendimiento (Ton/Ha)', 'PMR ($/Ton)', 'Valor Producción (Miles de pesos)'];
        } else {
            return ['Cultivo', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Sup. Siniestrada (Ha)', 'Producción (Ton)', 'Rendimiento (Ton/Ha)', 'PMR ($/Ton)', 'Valor Producción (Miles de pesos)'];
        }
    }


    public static buildPrintableFieldsConsultaCultivo(obj: any): string[] {
        if (obj.catalogo !== undefined && obj.catalogo === 'detalle') {
            return ['nombre', 'variedad', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];
        } else {
            return ['nombre', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];
        }
    }

    public static buildPrintableFieldsTerritorioCultivo(obj: number): string[] {
        switch (obj) {
            case 1:
                return ['nombre', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];


            case 2:
                return ['nombre', 'distrito', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];


            case 3:
                return ['nombre', 'municipio', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];


            case 4:
                return ['nombre', 'distrito', 'municipio', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];


            case 5:
                return ['distrito', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];


            case 6:
                return ['municipio', 'sembrada', 'cosechada', 'siniestrada', 'produccion', 'rendimiento', 'pmr', 'valor'];
        }

        return [];
    }

    public static buildColumnFieldsTerritorioCultivo(obj: number): string[] {
        switch (obj) {
            case 1:
                return ['Estado', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];


            case 2:
                return ['Estado', 'Distrito', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];


            case 3:
                return ['Estado', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];


            case 4:
                return ['Estado', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];


            case 5:
                return ['Distrito', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];


            case 6:
                return ['Municipio', 'Sup. Sembrada (Ha)', 'Sup. Cosechada (Ha)', 'Siniestrada (Ha)', 'Produccion (Ton)', 'Rendimiento (Ton / Ha)', 'pmr ($/ Ton)', 'valor (Miles de Pesos)'];
        }

        return [];
    }

}
