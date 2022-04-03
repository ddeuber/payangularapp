import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayappToolbarComponent } from './payapp-toolbar.component';

describe('PayappToolbarComponent', () => {
  let component: PayappToolbarComponent;
  let fixture: ComponentFixture<PayappToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayappToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayappToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
