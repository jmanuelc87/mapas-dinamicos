import { TestBed, inject } from '@angular/core/testing';

import { EsriExtentService } from './esri-extent.service';

describe('EsriExtentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsriExtentService]
    });
  });

  it('should be created', inject([EsriExtentService], (service: EsriExtentService) => {
    expect(service).toBeTruthy();
  }));
});
