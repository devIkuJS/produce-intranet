import { TestBed, inject } from '@angular/core/testing';

import { AdministradoService } from './administrado.service';

describe('AdministradoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministradoService]
    });
  });

  it('should be created', inject([AdministradoService], (service: AdministradoService) => {
    expect(service).toBeTruthy();
  }));
});
