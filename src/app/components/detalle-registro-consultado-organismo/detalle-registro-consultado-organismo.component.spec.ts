import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRegistroConsultadoOrganismoComponent } from './detalle-registro-consultado-organismo.component';

describe('DetalleRegistroConsultadoOrganismoComponent', () => {
  let component: DetalleRegistroConsultadoOrganismoComponent;
  let fixture: ComponentFixture<DetalleRegistroConsultadoOrganismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRegistroConsultadoOrganismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRegistroConsultadoOrganismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
