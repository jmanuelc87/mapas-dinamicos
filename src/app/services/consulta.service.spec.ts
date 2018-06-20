import { TestBed, inject } from '@angular/core/testing';

import { ConsultaService } from './consulta.service';
import { HttpClientModule } from '@angular/common/http';

describe('ConsultaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ConsultaService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([ConsultaService], (service: ConsultaService) => {
        expect(service).toBeTruthy();
    }));
});
