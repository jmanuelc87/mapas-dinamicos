import { TestBed, inject } from '@angular/core/testing';

import { PopupService } from './popup.service';
import { HttpClientModule } from '@angular/common/http';

describe('PopupService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PopupService],
            imports: [HttpClientModule]
        });
    });

    it('should be created', inject([PopupService], (service: PopupService) => {
        expect(service).toBeTruthy();
    }));
});
