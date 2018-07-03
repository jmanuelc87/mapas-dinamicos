import { Injectable } from '@angular/core';
import { FormatterService } from './formatter.service';

@Injectable({
    providedIn: 'root'
})
export class ColumnsService {

    constructor(
        private formatterService: FormatterService,
    ) { }

    defaultColumns = [
        {
            headerName: "Cultivo",
            field: "cultivo",
            width: 150,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: "Variedad",
            field: "variedad",
            width: 150,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: "Estado",
            field: "estado",
            width: 150,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: "Distrito",
            field: "distrito",
            width: 150,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: "Municipio",
            field: "municipio",
            width: 150,
            filter: 'agTextColumnFilter',
        },
        {
            headerName: "Sup. Sembrada(Ha)",
            field: "sembrada",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value * 1);
                return value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
        },
        {
            headerName: "Sup. Cosechada(Ha)",
            field: "cosechada",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value * 1);
                return value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
        },
        {
            headerName: "Produción(Ton)",
            field: "produccion",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value * 1);
                return value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
        },
        {
            headerName: "Rendimiento(Ton/Ha)",
            field: "rendimiento",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value * 1);
                return value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
        },
        {
            headerName: "PMR($/Ton)",
            field: "pmr",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value * 1);
                return value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            },
        },
        {
            headerName: "Valor(Miles de Pesos)",
            field: "valor",
            width: 150,
            filter: 'agNumberColumnFilter',
            type: "numericColumn",
            valueFormatter: (params) => {
                let value = (params.value / 1000);
                return '$ ' + value
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
        }
    ];

    parseConsultaForProduccionCultivo(consulta) {
        let columns = [];
        for (let item of this.defaultColumns) {
            if (consulta['catalogo'] == 'detalle' && item.field == 'variedad') {
                columns.push(item);
                continue;
            }

            if (consulta['catalogo'] == 'generico' && item.field == 'variedad') {
                // do nothing
                continue;
            }

            if (item.field == 'estado' || item.field == 'distrito' || item.field == 'municipio') {
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

            if (item.field == 'cultivo' || item.field == 'variedad') {
                continue;
            }

            if (consulta['filtro-estado'] == 'estado' && (item.field == 'distrito' || item.field == 'municipio')) {
                continue;
            }

            if (consulta['filtro-estado'] == 'distrito' && item.field == 'municipio') {
                continue;
            }

            if (consulta['filtro-estado'] == 'municipio' && item.field == 'distrito') {
                continue;
            }

            if (consulta['cultivo'] == 0 && (item.field == 'produccion' || item.field == 'rendimiento' || item.field == 'pmr')) {
                continue;
            }


            columns.push(item);
        }

        return columns;
    }

}
