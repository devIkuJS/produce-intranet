import { TestBed, inject } from '@angular/core/testing';

import {CoordinadorService } from './coordinador.service';

describe('SupervisorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinadorService]
    });
  });

  it('should be created', inject([CoordinadorService], (service: CoordinadorService) => {
    expect(service).toBeTruthy();
  }));
});
