import { TestBed, inject } from '@angular/core/testing';

import { AnioService } from './anio.service';
import { HttpClientModule } from '@angular/common/http';

describe('AnioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnioService],
      imports: [HttpClientModule],
    });
  });

  it('should be created', inject([AnioService], (service: AnioService) => {
    expect(service).toBeTruthy();
  }));
});
