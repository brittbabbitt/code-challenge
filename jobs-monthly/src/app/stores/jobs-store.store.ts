import { Injectable } from '@angular/core';

import {
  Observable,
  tap,
  withLatestFrom,
} from 'rxjs';

import { JobDescription } from '@interfaces/job-description.object';
import { JobMonthly } from '@interfaces/job-monthly.object';
import { ComponentStore } from '@ngrx/component-store';

export interface JobDescriptionState {
  jobsDescripts: JobDescription[];
  monthlyDescripts: JobMonthly[];
  jobsByMonth: JobMonthly;
};

const DEFAULT_JOB_STATE: JobDescriptionState = {
  jobsDescripts: [],
  monthlyDescripts: [],
  jobsByMonth: {
    month: 'JAN',
    jobs: []
  },
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{

  constructor() {
    super(DEFAULT_JOB_STATE);
  }

  //--Selectors--//

  readonly jobsDescripts$ = this.select((state) => state.jobsDescripts);
  readonly monthlyDescripts$ = this.select((state) => state.monthlyDescripts);
  readonly jobsByMonth$ = this.select((state) => state.jobsByMonth );

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


  //--Effects--//

  readonly setNewJobsByMonth = this.effect((monthSelected$: Observable<string>) => {
    return monthSelected$.pipe(
      withLatestFrom(this.monthlyDescripts$),
      tap(([monthSelected, monthsDescripts]) => {
          const selectedJobsByMonth = monthsDescripts.find((jobs) => jobs.month == monthSelected )
          this.updateJobsByMonth(selectedJobsByMonth!);
      })
    )
  }

  )
}
