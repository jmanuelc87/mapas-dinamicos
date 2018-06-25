import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { ConsultaService } from './consulta.service';

import * as basepath from "./url";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsultaService', () => {
    let injector: TestBed;
    let service: ConsultaService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConsultaService],
            imports: [HttpClientTestingModule]
        });

        injector = getTestBed();
        service = injector.get(ConsultaService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', inject([ConsultaService], (service: ConsultaService) => {
        expect(service).toBeTruthy();
    }));

    it('should get produccion por cultivo', () => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "distrito": 0, "municipio": 0, "cultivo": 100, "variedad": 0 };
        const anuario = [
            { "id": "100", "cultivo": "Acelga", "sembrada": "551.10", "cosechada": "543.10", "produccion": "5132.72", "rendimiento": "9.451", "pmr": "3550.53", "valor": "18223872.46" }
        ];

        service.getAnuarioByCultivo(consulta).subscribe(response => {
            expect(response).toEqual(anuario);
        });


        const req = httpMock.expectOne(url + '/consultas/prod-cultivo');

        expect(req.request.method).toBe('POST');
        expect(JSON.parse(req.request.body)).toEqual(consulta);
        req.flush(anuario);
    });

    it('should get estados/distritos/municipios with id by cultivo', () => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "distrito": 0, "municipio": 0, "cultivo": 100, "variedad": 0 };
        const anuario = [
            { "idestado": "1", "nomestado": "Aguascalientes", "cveddr": "", "nomddr": "", "cvempio": "", "nommpio": "" },
            { "idestado": "2", "nomestado": "Baja California", "cveddr": "", "nomddr": "", "cvempio": "", "nommpio": "" },
            { "idestado": "3", "nomestado": "Baja California Sur", "cveddr": "", "nomddr": "", "cvempio": "", "nommpio": "" }
        ];

        service.getEstados(consulta).subscribe(response => {
            expect(anuario.length).toEqual(3);
            expect(response).toEqual(anuario);
        })

        const req = httpMock.expectOne(url + '/consultas/estados');

        expect(req.request.method).toBe('POST');
        expect(JSON.parse(req.request.body)).toEqual(consulta);
        req.flush(anuario);
    });

    it('should get estados with variables by resumen general or cultivo', () => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "cultivo": 0, "variedad": 0, "filtro-estado": "estado" };
        const anuario = [
            { "idestado": "1", "estado": "Aguascalientes", "sembrada": "8678.00", "cosechada": "8677.00", "valor": "252569538.82" },
            { "idestado": "2", "estado": "Baja California", "sembrada": "115888.20", "cosechada": "115717.70", "valor": "7057178705.65" },
            { "idestado": "3", "estado": "Baja California Sur", "sembrada": "19061.05", "cosechada": "19056.05", "valor": "1752606667.83" },
        ]

        service.getAnuarioByEstado(consulta).subscribe(response => {
            expect(anuario.length).toEqual(3);
            expect(response).toEqual(anuario);
        });

        const req = httpMock.expectOne(url + '/consultas/prod-estado');

        expect(req.request.method).toBe('POST');
        expect(JSON.parse(req.request.body)).toEqual(consulta);
        req.flush(anuario);
    });

});
