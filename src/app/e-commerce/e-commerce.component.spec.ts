import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceComponent } from './e-commerce.component';

describe('ECommerceComponent', () => {
  let component: ECommerceComponent;
  let fixture: ComponentFixture<ECommerceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ECommerceComponent]
    });
    fixture = TestBed.createComponent(ECommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
