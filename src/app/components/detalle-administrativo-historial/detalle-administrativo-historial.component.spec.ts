import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdministrativoHistorialComponent } from './detalle-administrativo-historial.component';

describe('DetalleAdministrativoHistorialComponent', () => {
  let component: DetalleAdministrativoHistorialComponent;
  let fixture: ComponentFixture<DetalleAdministrativoHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAdministrativoHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAdministrativoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
