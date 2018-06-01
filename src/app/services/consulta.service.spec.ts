import { TestBed, inject } from '@angular/core/testing';

import { ConsultaService } from './consulta.service';

describe('ConsultaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultaService]
    });
  });

  it('should be created', inject([ConsultaService], (service: ConsultaService) => {
    expect(service).toBeTruthy();
  }));
});
