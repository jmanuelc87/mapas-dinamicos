import { TestBed, inject } from '@angular/core/testing';

import { MunicipioService } from './municipio.service';

describe('MunicipioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunicipioService]
    });
  });

  it('should be created', inject([MunicipioService], (service: MunicipioService) => {
    expect(service).toBeTruthy();
  }));
});
