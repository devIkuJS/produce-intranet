import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrativoRespuestaComponent } from './detalle-administrativo-respuesta.component';

describe('DetalleAdministrativoRespuestaComponent', () => {
  let component: DetalleAdministrativoRespuestaComponent;
  let fixture: ComponentFixture<DetalleAdministrativoRespuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrativoRespuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrativoRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
