import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandingOrderContainerComponent } from './add-standing-order-container.component';

describe('AddStandingOrderContainerComponent', () => {
  let component: AddStandingOrderContainerComponent;
  let fixture: ComponentFixture<AddStandingOrderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStandingOrderContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStandingOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
