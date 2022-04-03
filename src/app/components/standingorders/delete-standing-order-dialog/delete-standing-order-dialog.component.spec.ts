import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStandingOrderDialogComponent } from './delete-standing-order-dialog.component';

describe('DeleteStandingOrderDialogComponent', () => {
  let component: DeleteStandingOrderDialogComponent;
  let fixture: ComponentFixture<DeleteStandingOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStandingOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStandingOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
