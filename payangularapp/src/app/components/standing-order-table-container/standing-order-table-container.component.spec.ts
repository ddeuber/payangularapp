import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrderTableContainerComponent } from './standing-order-table-container.component';

describe('StandingOrderTableContainerComponent', () => {
  let component: StandingOrderTableContainerComponent;
  let fixture: ComponentFixture<StandingOrderTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrderTableContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrderTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
