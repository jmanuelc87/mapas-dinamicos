import { TestBed, inject } from '@angular/core/testing';

import { CultivoService } from './cultivo.service';
import { HttpClientModule } from '@angular/common/http';

describe('CultivoService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CultivoService],
            imports: [HttpClientModule],
        });
    });

    it('should be created', inject([CultivoService], (service: CultivoService) => {
        expect(service).toBeTruthy();
    }));
});
