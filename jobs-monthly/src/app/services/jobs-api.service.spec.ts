import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import {
  of,
  Subscription,
} from 'rxjs';

import TESTDATA from '@components/mockData.test';

import { JobsApiService } from './jobs-api.service';

describe('JobsApiService', () => {
  let service: JobsApiService;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(JobsApiService);
  });

  afterAll(() => {
    subscription.unsubscribe();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getJobDescriptions()', () => {
    it('should execute only 1 time', () => {
      const getJobDescriptionsSpy = spyOn(service,'getJobDescriptions').and.returnValue(of(TESTDATA.jobDescriptions));
      service.getJobDescriptions();
      expect(getJobDescriptionsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an Observable of at least 1 Array item when called', () => {
      const getJobDescriptionsSpy = spyOn(service,'getJobDescriptions').and.returnValue(of(TESTDATA.jobDescriptions));
      const response$ = service.getJobDescriptions();
      expect(getJobDescriptionsSpy).toHaveBeenCalled();
      subscription = response$.subscribe({
        next: (x) => expect(x.length).toBeGreaterThan(1)
      });
    });

    it('should return an Observable with expected websiteTitle from TESTDATA', () => {
      const getJobDescriptionsSpy = spyOn(service,'getJobDescriptions').and.returnValue(of(TESTDATA.jobDescriptions));
      const response$ = service.getJobDescriptions();
      expect(getJobDescriptionsSpy).toHaveBeenCalled();
      subscription = response$.subscribe({
        next: (x) => expect(x[0].websiteTitle).toBe(TESTDATA.jobDescriptions[0].websiteTitle)
      });
    });

  });
});
