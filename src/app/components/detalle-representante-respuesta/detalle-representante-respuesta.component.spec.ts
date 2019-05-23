import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepresentanteRespuestaComponent } from './detalle-representante-respuesta.component';

describe('DetalleRepresentanteRespuestaComponent', () => {
  let component: DetalleRepresentanteRespuestaComponent;
  let fixture: ComponentFixture<DetalleRepresentanteRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRepresentanteRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepresentanteRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
