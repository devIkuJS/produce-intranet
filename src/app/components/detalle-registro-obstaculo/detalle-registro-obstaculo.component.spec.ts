import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRegistroObstaculoComponent } from './detalle-registro-obstaculo.component';

describe('DetalleRegistroObstaculoComponent', () => {
  let component: DetalleRegistroObstaculoComponent;
  let fixture: ComponentFixture<DetalleRegistroObstaculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRegistroObstaculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRegistroObstaculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
