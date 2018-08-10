import { Injectable } from '@angular/core';
import { FormatterService } from './formatter.service';
import { Columna } from '../components/form/grid/columna';

@Injectable({
    providedIn: 'root'
})
export class ColumnsService {

    constructor(
        private formatterService: FormatterService,
    ) { }

    defaultColumns: Columna[] = [
        {
            index: -1,
            cabecera: "Cultivo",
            campo: "cultivo",
            align: "izq",
        },
        {
            index: -2,
            cabecera: "Variedad",
            campo: "variedad",
            align: "izq",
        },
        {
            index: -3,
            cabecera: "Estado",
            campo: "estado",
            align: "izq",
        },
        {
            index: -4,
            cabecera: "Distrito",
            campo: "distrito",
            align: "izq"
        },
        {
            index: -5,
            cabecera: "Municipio",
            campo: "municipio",
            align: "der"
        },
        {
            index: -6,
            cabecera: "Sup. Sembrada(Ha)",
            campo: "sembrada",
            align: "der"
        },
        {
            index: -7,
            cabecera: "Sup. Cosechada(Ha)",
            campo: "cosechada",
            align: "der",
        },
        {
            index: -8,
            cabecera: "Produción(Ton)",
            campo: "produccion",
            align: "der",
        },
        {
            index: -9,
            cabecera: "Rendimiento(Ton/Ha)",
            campo: "rendimiento",
            align: "der",
        },
        {
            index: -10,
            cabecera: "PMR($/Ton)",
            campo: "pmr",
            align: "der",
        },
        {
            index: -11,
            cabecera: "Valor(Miles de Pesos)",
            campo: "valor",
            align: "der",
        }
    ];

    parseConsultaForProduccionCultivo(consulta) {
        let columns = [];
        for (let item of this.defaultColumns) {
            if (consulta['catalogo'] == 'detalle' && item.campo == 'variedad') {
                columns.push(item);
                continue;
            }

            if (consulta['catalogo'] == 'generico' && item.campo == 'variedad') {
                // do nothing
                continue;
            }

            if (item.campo == 'estado' || item.campo == 'distrito' || item.campo == 'municipio') {
                // do nothing
                continue;
            }

            columns.push(item);
        }

        return columns;
    }

    parseConsultaForProduccionEstado(consulta) {
        let columns = [];

        for (let item of this.defaultColumns) {

            if (item.campo == 'cultivo' || item.campo == 'variedad') {
                continue;
            }

            if (consulta['filtro-estado'] == 'estado' && (item.campo == 'distrito' || item.campo == 'municipio')) {
                continue;
            }

            if (consulta['filtro-estado'] == 'distrito' && item.campo == 'municipio') {
                continue;
            }

            if (consulta['filtro-estado'] == 'municipio' && item.campo == 'distrito') {
                continue;
            }

            if (consulta['cultivo'] == 0 && (item.campo == 'produccion' || item.campo == 'rendimiento' || item.campo == 'pmr')) {
                continue;
            }


            columns.push(item);
        }

        return columns;
    }

}
