import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConsultadoAdministradoComponent } from './detalle-consultado-administrado.component';

describe('DetalleConsultadoAdministradoComponent', () => {
  let component: DetalleConsultadoAdministradoComponent;
  let fixture: ComponentFixture<DetalleConsultadoAdministradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConsultadoAdministradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConsultadoAdministradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
