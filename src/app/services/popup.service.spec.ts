import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { PopupService } from "./popup.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import * as basepath from "./url";

describe('PopupService', () => {
    let injector: TestBed;
    let service: PopupService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl + '/cierre';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PopupService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(PopupService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([PopupService], (service: PopupService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch a record to show a popup by sta / mun / ddr', () => {
        const consulta = { "ciclo": "1", "modalidad": "1", "catalogo": "generico", "anio": "2016", "estado": 0, "distrito": 0, "municipio": 0, "cultivo": 100, "variedad": 0, "attributes": { "OBJECTID": 10, "CVE_ENT": "10", "NOM_ENT": "Durango", "Shape_Area": 150711132110.3889, "OBJECTID_1": 10, "Shape_Length": 2775945.309952 } };
        const dummy = [
            { "cultivo": "Acelga", "estado": "Durango", "distrito": "", "municipio": "", "sembrada": "2.00", "cosechada": "2.00", "produccion": "21.00", "valor": "75600.00" }
        ];

        service.getCierreByAnuario(consulta).subscribe(response => {
            expect(response.length).toBe(1);
            expect(response).toEqual(dummy);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush(dummy);
    });
});
