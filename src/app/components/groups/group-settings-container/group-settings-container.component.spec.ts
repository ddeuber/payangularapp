import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsContainerComponent } from './group-settings-container.component';

describe('GroupSettingsContainerComponent', () => {
  let component: GroupSettingsContainerComponent;
  let fixture: ComponentFixture<GroupSettingsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSettingsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
