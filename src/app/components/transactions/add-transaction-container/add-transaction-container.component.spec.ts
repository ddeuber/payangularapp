import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionContainerComponent } from './add-transaction-container.component';

describe('AddTransactionContainerComponent', () => {
  let component: AddTransactionContainerComponent;
  let fixture: ComponentFixture<AddTransactionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
