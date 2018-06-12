import { TestBed, inject } from '@angular/core/testing';

import { ScannerService } from './scanner.service';

describe('ScannerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ScannerService]
        });
    });

    it('should be created', inject([ScannerService], (service: ScannerService) => {
        expect(service).toBeTruthy();
    }));

    it('should parse an rgb string', inject([ScannerService], (service: ScannerService) => {
        service.addContent('rgb(192, 20, 63)');
        let r = service.parseNext();
        let g = service.parseNext();
        let b = service.parseNext();
        expect(r).toBe(192);
        expect(g).toBe(20);
        expect(b).toBe(63);
    }));
});
