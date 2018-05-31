import { TestBed, inject } from '@angular/core/testing';

import { EstadoService } from './estado.service';
import { HttpClientModule } from '@angular/common/http';

describe('EstadoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EstadoService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([EstadoService], (service: EstadoService) => {
        expect(service).toBeTruthy();
    }));
});
