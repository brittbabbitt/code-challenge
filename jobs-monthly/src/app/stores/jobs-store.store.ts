import { HttpErrorResponse } from '@angular/common/http';
import {
  inject,
  Injectable,
} from '@angular/core';

import {
  Observable,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';

import {
  JobDescription,
  JobDescriptionState,
  JobMonthly,
} from '@interfaces/job-description.object';
import {
  ComponentStore,
  tapResponse,
} from '@ngrx/component-store';
import { JobsApiService } from '@services/jobs-api.service';

const DEFAULT_JOB_STATE: JobDescriptionState = {
  jobsDescripts: [],
  monthlyDescripts: [],
  jobsByMonth: {
    month: 'JAN',
    jobs: []
  },
  apiError: null,
  loading: true,
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{
  private readonly jobService: JobsApiService = inject(JobsApiService);

  constructor() {
    super(DEFAULT_JOB_STATE);
  }

  //--Selectors--//

  readonly jobsDescripts$ = this.select((state) => state.jobsDescripts);
  readonly monthlyDescripts$ = this.select((state) => state.monthlyDescripts);
  readonly jobsByMonth$ = this.select((state) => state.jobsByMonth);
  readonly apiError$ = this.select((state) => state.apiError);
  readonly loading$ = this.select((state) => state.loading);

  //---Updaters---//

  readonly updateJobDescriptions = this.updater((state, jobsDescription: JobDescription[] | undefined) => ({
    ...state,
    jobsDescripts: jobsDescription || [],
  }));

  readonly updateMonthlyDescriptions = this.updater((state, monthlyBuckets: JobMonthly[]) => ({
    ...state,
    monthlyDescripts: monthlyBuckets || [],
  }));

  readonly updateJobsByMonth = this.updater((state, jobsByMonth: JobMonthly) => ({
    ...state,
    jobsByMonth: jobsByMonth || DEFAULT_JOB_STATE.jobsByMonth,
  }));

  readonly updateApiError = this.updater((state, apiError: string) => ({
    ...state,
    apiError: apiError || null
  }));

  readonly updateLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading: loading
  }));

  //--Effects--//

  /**
   * @name setNewJobsByMonth
   * @param string | Observable<string> - 3 uppercased chars of the selected month (i.e. 'JAN')
   * @description updates monthlyDescripts$ with a JobMonthly object of the selected month
   */
  readonly setNewJobsByMonth = this.effect((monthSelected$: Observable<string>) => {
    return monthSelected$.pipe(
      withLatestFrom(this.monthlyDescripts$),
      tap(([monthSelected, monthsDescripts]) => {
          const selectedJobsByMonth = monthsDescripts.find((jobs) => jobs.month == monthSelected);
          this.updateJobsByMonth(selectedJobsByMonth!);
      })
    )
  });

  /**
   * @name getJobDescriptions
   * @description calls getJobDescriptions from jobService to get a list of job descriptions from the api
   * updates jobsDescripts$ with data from service call and sets loading to false after call completes,
   * if there is an error, the apiError$ is updated with the message from the request.
   */
  readonly getJobDescriptions = this.effect(() => {
    return this.jobService.getJobDescriptions().pipe(
      take(1),
      tapResponse(
        (jobDescripts: JobDescription[]) => {
          this.updateJobDescriptions(jobDescripts);
          this.updateLoading(false);
        },
        (error: HttpErrorResponse) => {
          this.updateApiError(error.message);
          this.updateLoading(false);
        }
      )
    );
  });

}
