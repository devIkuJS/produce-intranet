import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRegistroConsultadoComponent } from './detalle-registro-consultado.component';

describe('DetalleRegistroConsultadoComponent', () => {
  let component: DetalleRegistroConsultadoComponent;
  let fixture: ComponentFixture<DetalleRegistroConsultadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRegistroConsultadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRegistroConsultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
