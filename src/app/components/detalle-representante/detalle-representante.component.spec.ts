import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepresentanteComponent } from './detalle-representante.component';

describe('DetalleRepresentanteComponent', () => {
  let component: DetalleRepresentanteComponent;
  let fixture: ComponentFixture<DetalleRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
