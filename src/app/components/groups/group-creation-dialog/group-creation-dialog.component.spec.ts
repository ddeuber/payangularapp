import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreationDialogComponent } from './group-creation-dialog.component';

describe('GroupCreationDialogComponent', () => {
  let component: GroupCreationDialogComponent;
  let fixture: ComponentFixture<GroupCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
