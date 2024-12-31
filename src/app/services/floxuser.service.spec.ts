import { TestBed } from '@angular/core/testing';

import { FloxuserService } from './floxuser.service';

describe('FloxuserService', () => {
  let service: FloxuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloxuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
