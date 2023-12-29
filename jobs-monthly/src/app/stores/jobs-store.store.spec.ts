import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { JobsApiService } from '@services/jobs-api.service';

import { JobsStore } from './jobs-store.store';

describe('JobsStoreService', () => {
  const MockJobsApiService = jasmine.createSpyObj('JobsApiService', ['getJobDescriptions']);
  const MockJobsStoreSpy = jasmine.createSpyObj('JobsStore', [
    'getJobDescriptions',
    'setNewJobsByMonth',
  ]);

  let service: JobsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provider: JobsApiService, useValue: MockJobsApiService},
      ]
    });
    TestBed.overrideProvider(JobsStore, {useValue: MockJobsStoreSpy});
    service = TestBed.inject(JobsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
