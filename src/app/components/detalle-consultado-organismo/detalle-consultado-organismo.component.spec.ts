import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConsultadoOrganismoComponent } from './detalle-consultado-organismo.component';

describe('DetalleConsultadoOrganismoComponent', () => {
  let component: DetalleConsultadoOrganismoComponent;
  let fixture: ComponentFixture<DetalleConsultadoOrganismoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConsultadoOrganismoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConsultadoOrganismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
