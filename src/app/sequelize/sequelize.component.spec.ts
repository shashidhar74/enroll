import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequelizeComponent } from './sequelize.component';

describe('SequelizeComponent', () => {
  let component: SequelizeComponent;
  let fixture: ComponentFixture<SequelizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SequelizeComponent]
    });
    fixture = TestBed.createComponent(SequelizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
