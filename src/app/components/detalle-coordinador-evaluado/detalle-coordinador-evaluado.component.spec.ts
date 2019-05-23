import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCoordinadorEvaluadoComponent } from './detalle-coordinador-evaluado.component';

describe('DetalleCoordinadorEvaluadoComponent', () => {
  let component: DetalleCoordinadorEvaluadoComponent;
  let fixture: ComponentFixture<DetalleCoordinadorEvaluadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCoordinadorEvaluadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCoordinadorEvaluadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
