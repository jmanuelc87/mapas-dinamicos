import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { DistritoService } from './distrito.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import * as basepath from "./url";

describe('DistritoService', () => {
    let injector: TestBed;
    let service: DistritoService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl + '/catalogo/distritos';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DistritoService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(DistritoService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([DistritoService], (service: DistritoService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch all distritos by estado', () => {
        const estadoid = 1;
        const dummy = [
            { id: 1, name: 'Aguascalientes' }
        ];

        service.getDistritoByEstado(estadoid).subscribe(response => {
            expect(response.length).toBe(1);
            expect(response).toEqual(dummy);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummy);
    });
});
