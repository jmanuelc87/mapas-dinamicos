import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnioService } from './anio.service';

import * as basepath from "./url";

describe('AnioService', () => {
    let injector: TestBed;
    let service: AnioService;
    let httpMock: HttpTestingController;
    let url = basepath.default.baseUrl + '/catalogo/years';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AnioService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        service = injector.get(AnioService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', inject([AnioService], (service: AnioService) => {
        expect(service).toBeTruthy();
    }));

    it('should fetch all years', () => {
        const dummyYears = [
            { anio: 2016 },
            { anio: 2015 },
            { anio: 2014 }
        ];

        service.getAllAnios().subscribe(anios => {
            expect(anios.length).toBe(3);
            expect(anios).toEqual(dummyYears);
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummyYears);
    });
});
