import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionListFilterComponent } from './transaction-list-filter.component';

describe('TransactionListFilterComponent', () => {
  let component: TransactionListFilterComponent;
  let fixture: ComponentFixture<TransactionListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
