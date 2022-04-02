import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandingOrderComponent } from './add-standing-order.component';

describe('AddStandingOrderComponent', () => {
  let component: AddStandingOrderComponent;
  let fixture: ComponentFixture<AddStandingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStandingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
