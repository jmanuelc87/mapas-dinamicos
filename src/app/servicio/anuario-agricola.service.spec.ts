import { TestBed, inject } from '@angular/core/testing';

import { AnuarioAgricolaService } from './anuario-agricola.service';

describe('AnuarioAgricolaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnuarioAgricolaService]
    });
  });

  it('should be created', inject([AnuarioAgricolaService], (service: AnuarioAgricolaService) => {
    expect(service).toBeTruthy();
  }));
});
