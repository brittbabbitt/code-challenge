import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { take } from 'rxjs';

import { TEST_JOB_STATE } from '@components/mockData.test';
import {
  JobDescription,
  JobMonthly,
} from '@interfaces/job-description.object';
import { JobsApiService } from '@services/jobs-api.service';

import { JobsStore } from './jobs-store.store';

describe('JobsStoreService', () => {

  let store: JobsStore;
  let apiService: JobsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        JobsStore,
        JobsApiService,
      ]
    });
    store = TestBed.inject(JobsStore);
    apiService = TestBed.inject(JobsApiService);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('Selectors', () => {

    it('should return Job Descriptions from state', () => {
      const jobDescriptions = TEST_JOB_STATE.jobsDescripts;
      store.patchState({jobsDescripts:jobDescriptions})

      store.jobsDescripts$.pipe(take(1)).subscribe({
        next: (jobs: JobDescription[]) => {
          expect(jobs.length).toBe(jobDescriptions.length);
        },
      });
    });

    it('should return Monthly Descriptions from state', () => {
      const monthlyDescripts = TEST_JOB_STATE.monthlyDescripts;
      store.patchState({monthlyDescripts:monthlyDescripts})

      store.monthlyDescripts$.pipe(take(1)).subscribe({
        next: (jobs: JobMonthly[]) => {
          expect(jobs.length).toBe(monthlyDescripts.length);
        },
      });
    });

    it('should return Job By Month from state', () => {
      const jobsByMonth = TEST_JOB_STATE.jobsByMonth;
      store.patchState({jobsByMonth:jobsByMonth})

      store.jobsByMonth$.pipe(take(1)).subscribe({
        next: (jobs: JobMonthly) => {
          expect(jobs.month).toBe(jobsByMonth.month);
        },
      });
    });

  });

  describe('Updaters', () => {
    it('updateApiError should update state with new ApiError message', () => {
      const apiError = "something went wrong";
      store.updateApiError(apiError);
      store.apiError$.pipe(take(1)).subscribe({
        next: (apiError: string | null) => {
          expect(apiError).toBe(apiError)
        }
      })
    });

    it('updateLoading should update state with new loading value', () => {
      const loadingValue = false;
      store.updateLoading(loadingValue);
      store.loading$.pipe(take(1)).subscribe({
        next: (loading: boolean) => {
          expect(loading).toBe(loadingValue);
        }
      })
    });

    describe('Effects', () => {
      it('setNewJobsByMonth should take the month and updateJobsByMonth with the array of jobs matching the selected month', () =>{
        const selectedMonth = 'FEB'
        store.updateMonthlyDescriptions(TEST_JOB_STATE.monthlyDescripts);
        store.setNewJobsByMonth(selectedMonth);

        store.jobsByMonth$.pipe(take(1)).subscribe({
          next: (jobs: JobMonthly) => {
            expect(jobs.month).toBe(selectedMonth);
          },
        });
      });

    });
  });

});
