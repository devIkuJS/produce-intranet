import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCoordinadorRespuestaComponent } from './detalle-coordinador-respuesta.component';

describe('DetalleCoordinadorRespuestaComponent', () => {
  let component: DetalleCoordinadorRespuestaComponent;
  let fixture: ComponentFixture<DetalleCoordinadorRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCoordinadorRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCoordinadorRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
