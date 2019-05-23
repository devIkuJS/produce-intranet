import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRespuestaEnviadoCoordinadorComponent } from './detalle-respuesta-enviado-coordinador.component';

describe('DetalleRespuestaEnviadoCoordinadorComponent', () => {
  let component: DetalleRespuestaEnviadoCoordinadorComponent;
  let fixture: ComponentFixture<DetalleRespuestaEnviadoCoordinadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRespuestaEnviadoCoordinadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRespuestaEnviadoCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
