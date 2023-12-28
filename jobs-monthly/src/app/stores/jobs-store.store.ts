import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{

  constructor(private readonly jobService: JobsApiService) {
    super(DEFAULT_JOB_STATE);
  }

  //--Selectors--//

  readonly jobsDescripts$ = this.select((state) => state.jobsDescripts);
  readonly monthlyDescripts$ = this.select((state) => state.monthlyDescripts);
  readonly jobsByMonth$ = this.select((state) => state.jobsByMonth );
  readonly apiError$ = this.select((state) => state.apiError );

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

  //--Effects--//

  readonly setNewJobsByMonth = this.effect((monthSelected$: Observable<string>) => {
    return monthSelected$.pipe(
      withLatestFrom(this.monthlyDescripts$),
      tap(([monthSelected, monthsDescripts]) => {
          const selectedJobsByMonth = monthsDescripts.find((jobs) => jobs.month == monthSelected )
          this.updateJobsByMonth(selectedJobsByMonth!);
      })
    )
  });

  readonly getJobDescriptions = this.effect(() => {
    return this.jobService.getJobDescriptions().pipe(
      take(1),
      tapResponse(
        (jobDescripts: JobDescription[]) => this.updateJobDescriptions(jobDescripts),
        (error: HttpErrorResponse) => this.updateApiError(error.message)
      )
    )
  });

}
