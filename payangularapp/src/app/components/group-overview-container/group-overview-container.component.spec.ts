import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupOverviewContainerComponent } from './group-overview-container.component';

describe('GroupOverviewContainerComponent', () => {
  let component: GroupOverviewContainerComponent;
  let fixture: ComponentFixture<GroupOverviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupOverviewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOverviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
