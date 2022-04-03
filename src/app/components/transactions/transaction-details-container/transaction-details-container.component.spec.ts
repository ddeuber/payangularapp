import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsContainerComponent } from './transaction-details-container.component';

describe('TransactionDetailsContainerComponent', () => {
  let component: TransactionDetailsContainerComponent;
  let fixture: ComponentFixture<TransactionDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDetailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
