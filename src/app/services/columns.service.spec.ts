import { TestBed, inject } from '@angular/core/testing';

import { ColumnsService } from './columns.service';
import { FormatterService } from './formatter.service';

describe('ColumnsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ColumnsService, FormatterService]
        });
    });

    it('should be created', inject([ColumnsService], (service: ColumnsService) => {
        expect(service).toBeTruthy();
    }));

    it('should parse the object consulta without variedad', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "distrito": 0, "municipio": 0, "cultivo": 100, "variedad": 0 };
        let cols = service.parseConsultaForProduccionCultivo(consulta);
        expect(cols).toEqual([
            {
                headerName: "Cultivo",
                field: "cultivo",
                width: 150,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));


    it('should parse the object consulta with variedad', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "distrito": 0, "municipio": 0, "cultivo": 100, "variedad": 1 };
        let cols = service.parseConsultaForProduccionCultivo(consulta);
        expect(cols).toEqual([
            {
                headerName: "Cultivo",
                field: "cultivo",
                width: 150,
            },
            {
                headerName: "Variedad",
                field: "variedad",
                width: 150,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));

    it('should parse consulta, produccion por estado to get the columns with estado', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "cultivo": 0, "variedad": 0, "filtro-estado": "estado" };
        let cols = service.parseConsultaForProduccionEstado(consulta);
        expect(cols).toEqual([
            {
                headerName: "Estado",
                field: "estado",
                width: 100,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));

    it('should parse consulta, produccion por estado to get the columns with estado distrito', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "cultivo": 0, "variedad": 0, "filtro-estado": "distrito" };
        let cols = service.parseConsultaForProduccionEstado(consulta);
        expect(cols).toEqual([
            {
                headerName: "Estado",
                field: "estado",
                width: 100,
            },
            {
                headerName: "Distrito",
                field: "distrito",
                width: 100,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));

    it('should parse consulta, produccion por estado to get the columns with estado municipio', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "cultivo": 0, "variedad": 0, "filtro-estado": "municipio" };
        let cols = service.parseConsultaForProduccionEstado(consulta);
        expect(cols).toEqual([
            {
                headerName: "Estado",
                field: "estado",
                width: 100,
            },
            {
                headerName: "Municipio",
                field: "municipio",
                width: 100,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));

    it('should parse consulta, produccion por estado to get the columns with estado municipio and ddr', inject([ColumnsService, FormatterService], (service: ColumnsService, formatter: FormatterService) => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "cultivo": 0, "variedad": 0, "filtro-estado": "ddr-mun" };
        let cols = service.parseConsultaForProduccionEstado(consulta);
        expect(cols).toEqual([
            {
                headerName: "Estado",
                field: "estado",
                width: 100,
            },
            {
                headerName: "Distrito",
                field: "distrito",
                width: 100,
            },
            {
                headerName: "Municipio",
                field: "municipio",
                width: 100,
            },
            {
                headerName: "Sup. Sembrada(Ha)",
                field: "sembrada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Sup. Cosechada(Ha)",
                field: "cosechada",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Produción(Ton)",
                field: "produccion",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Rendimiento(Ton/Ha)",
                field: "rendimiento",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "PMR($/Ton)",
                field: "pmr",
                width: 150,
                valueFormatter: formatter.formatNumber,
            },
            {
                headerName: "Valor(Miles de Pesos)",
                field: "valor",
                width: 150,
                valueFormatter: formatter.formatNumberDivideThousands,
            }
        ]);
    }));
});
