import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHistorialEvaluadorComponent } from './detalle-historial-evaluador.component';

describe('DetalleHistorialEvaluadorComponent', () => {
  let component: DetalleHistorialEvaluadorComponent;
  let fixture: ComponentFixture<DetalleHistorialEvaluadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleHistorialEvaluadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHistorialEvaluadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
