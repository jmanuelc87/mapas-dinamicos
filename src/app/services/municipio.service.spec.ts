import { TestBed, inject } from '@angular/core/testing';

import { MunicipioService } from './municipio.service';
import { HttpClientModule } from '@angular/common/http';

describe('MunicipioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MunicipioService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([MunicipioService], (service: MunicipioService) => {
    expect(service).toBeTruthy();
  }));
});
