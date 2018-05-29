import { TestBed, inject } from '@angular/core/testing';

import { AnioService } from './anio.service';

describe('AnioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnioService]
    });
  });

  it('should be created', inject([AnioService], (service: AnioService) => {
    expect(service).toBeTruthy();
  }));
});
