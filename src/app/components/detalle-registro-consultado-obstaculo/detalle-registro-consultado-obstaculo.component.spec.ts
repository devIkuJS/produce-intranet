import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRegistroConsultadoObstaculoComponent } from './detalle-registro-consultado-obstaculo.component';

describe('DetalleRegistroConsultadoObstaculoComponent', () => {
  let component: DetalleRegistroConsultadoObstaculoComponent;
  let fixture: ComponentFixture<DetalleRegistroConsultadoObstaculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRegistroConsultadoObstaculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRegistroConsultadoObstaculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
