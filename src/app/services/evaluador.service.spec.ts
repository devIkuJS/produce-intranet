import { TestBed, inject } from '@angular/core/testing';

import { EvaluadorService } from './evaluador.service';

describe('EvaluadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluadorService]
    });
  });

  it('should be created', inject([EvaluadorService], (service: EvaluadorService) => {
    expect(service).toBeTruthy();
  }));
});
