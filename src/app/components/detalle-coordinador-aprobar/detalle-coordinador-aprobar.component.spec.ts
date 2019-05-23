import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCoordinadorAprobarComponent } from './detalle-coordinador-aprobar.component';

describe('DetalleCoordinadorAprobarComponent', () => {
  let component: DetalleCoordinadorAprobarComponent;
  let fixture: ComponentFixture<DetalleCoordinadorAprobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCoordinadorAprobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCoordinadorAprobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
