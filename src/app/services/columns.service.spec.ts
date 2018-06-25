import { TestBed, inject } from '@angular/core/testing';

import { ColumnsService } from './columns.service';

describe('ColumnsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColumnsService]
    });
  });

  it('should be created', inject([ColumnsService], (service: ColumnsService) => {
    expect(service).toBeTruthy();
  }));
});
