import { TestBed, inject } from '@angular/core/testing';

import { GeometryService } from './geometry.service';

describe('GeometryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeometryService]
    });
  });

  it('should be created', inject([GeometryService], (service: GeometryService) => {
    expect(service).toBeTruthy();
  }));
});
