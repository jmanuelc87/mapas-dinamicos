import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { MunicipioService } from "./municipio.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import * as basepath from "./url";

describe('MunicipioService', () => {
    let injector: TestBed;
    let service: MunicipioService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl + '/catalogo/municipios';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MunicipioService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(MunicipioService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([MunicipioService], (service: MunicipioService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch all municipios by estado and distrito', () => {
        const estadoid = 1;
        const distritoid = 1;
        const dummy = [
            { id: 1, name: 'Aguascalientes' }
        ];

        service.getMunicipioByEstadoAndDistrito(estadoid, distritoid).subscribe(response => {
            expect(response.length).toBe(1);
            expect(response).toEqual(dummy);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummy);
    });
});
