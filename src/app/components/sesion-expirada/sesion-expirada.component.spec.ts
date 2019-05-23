import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionExpiradaComponent } from './sesion-expirada.component';

describe('SesionExpiradaComponent', () => {
  let component: SesionExpiradaComponent;
  let fixture: ComponentFixture<SesionExpiradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionExpiradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionExpiradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
