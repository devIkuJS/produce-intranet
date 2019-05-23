import { TestBed, inject } from '@angular/core/testing';

import { RepresentanteService } from './representante.service';

describe('RepresentanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepresentanteService]
    });
  });

  it('should be created', inject([RepresentanteService], (service: RepresentanteService) => {
    expect(service).toBeTruthy();
  }));
});
