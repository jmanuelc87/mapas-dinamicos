import { TestBed, inject } from '@angular/core/testing';

import { DistritoService } from './distrito.service';
import { HttpClientModule } from '@angular/common/http';

describe('DistritoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistritoService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([DistritoService], (service: DistritoService) => {
    expect(service).toBeTruthy();
  }));
});
