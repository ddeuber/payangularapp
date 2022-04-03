import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrderDetailsContainerComponent } from './standing-order-details-container.component';

describe('StandingOrderDetailsContainerComponent', () => {
  let component: StandingOrderDetailsContainerComponent;
  let fixture: ComponentFixture<StandingOrderDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrderDetailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrderDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
