import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { EstadoService } from "./estado.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import * as basepath from "./url";

describe('EstadpService', () => {
    let injector: TestBed;
    let service: EstadoService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl + '/catalogo/estados';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EstadoService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(EstadoService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([EstadoService], (service: EstadoService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch all years', () => {
        const dummy = [
            { id: 1, name: 'Aguascalientes' },
            { id: 2, name: 'Baja California' }
        ];

        service.getAllEstados().subscribe(response => {
            expect(response.length).toBe(2);
            expect(response).toEqual(dummy);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummy);
    });
});
