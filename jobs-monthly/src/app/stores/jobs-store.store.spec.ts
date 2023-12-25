import { TestBed } from '@angular/core/testing';

import { JobsStore } from './jobs-store.store';

describe('JobsStoreService', () => {
  let service: JobsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
