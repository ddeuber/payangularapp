import { TestBed } from '@angular/core/testing';

import { GroupSettingsService } from './group-settings.service';

describe('GroupSettingsService', () => {
  let service: GroupSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
