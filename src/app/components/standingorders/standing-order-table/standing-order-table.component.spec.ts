import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrderTableComponent } from './standing-order-table.component';

describe('StandingOrderTableComponent', () => {
  let component: StandingOrderTableComponent;
  let fixture: ComponentFixture<StandingOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
