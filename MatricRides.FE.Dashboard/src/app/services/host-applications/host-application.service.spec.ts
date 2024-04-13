import { TestBed } from '@angular/core/testing';

import { HostApplicationService } from './host-application.service';

describe('HostApplicationService', () => {
  let service: HostApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
