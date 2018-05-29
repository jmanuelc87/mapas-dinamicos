import { TestBed, inject } from '@angular/core/testing';

import { DistritoService } from './distrito.service';

describe('DistritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistritoService]
    });
  });

  it('should be created', inject([DistritoService], (service: DistritoService) => {
    expect(service).toBeTruthy();
  }));
});
