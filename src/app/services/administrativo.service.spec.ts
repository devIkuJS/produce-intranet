import { TestBed, inject } from '@angular/core/testing';

import { AdministrativoService } from './administrativo.service';

describe('AdministrativoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativoService]
    });
  });

  it('should be created', inject([AdministrativoService], (service: AdministrativoService) => {
    expect(service).toBeTruthy();
  }));
});
