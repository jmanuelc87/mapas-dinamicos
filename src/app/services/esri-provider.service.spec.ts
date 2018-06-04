import { TestBed, inject } from '@angular/core/testing';

import { EsriProviderService } from './esri-provider.service';

describe('EsriProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsriProviderService]
    });
  });

  it('should be created', inject([EsriProviderService], (service: EsriProviderService) => {
    expect(service).toBeTruthy();
  }));
});
