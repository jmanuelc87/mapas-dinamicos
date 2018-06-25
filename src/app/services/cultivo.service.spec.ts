import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { CultivoService } from './cultivo.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import * as basepath from "./url";


describe('CultivoService', () => {
    let injector: TestBed;
    let service: CultivoService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CultivoService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(CultivoService);
        httpMock = injector.get(HttpTestingController);
    });

    it('should be created', inject([CultivoService], (service: CultivoService) => {
        expect(service).toBeTruthy();
    }));

    it('should get cultivos', () => {
        let catalogo = 'generico';
        let anuario = [
            { "id": "1", "nombre": "Aceituna" },
            { "id": "100", "nombre": "Acelga" },
            { "id": "101", "nombre": "Achiote" },
            { "id": "103", "nombre": "Agapando" }
        ];

        service.getCultivos(catalogo).subscribe(response => {
            expect(response.length).toEqual(4);
            expect(response).toEqual(anuario);
        });

        const obj = httpMock.expectOne(url + '/catalogo/cultivos/' + catalogo);
        expect(obj.request.method).toBe('GET');
    });

    it('should get cultivos', () => {
        // INPUT
        let cultivoid = 100;

        // OUTPUT
        let anuario = [
            { "id": "200", "nombre": "Acelga" },
            { "id": "35700", "nombre": "Acelga china" },
        ];

        service.getVariedadesByCultivo(cultivoid).subscribe(response => {
            expect(response.length).toEqual(2);
            expect(response).toEqual(anuario);
        });

        const obj = httpMock.expectOne(url + '/catalogo/variedades/' + cultivoid);
        expect(obj.request.method).toBe('GET');
    });

});
