import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevelSpinnerComponent } from './top-level-spinner.component';

describe('TopLevelSpinnerComponent', () => {
  let component: TopLevelSpinnerComponent;
  let fixture: ComponentFixture<TopLevelSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLevelSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevelSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
