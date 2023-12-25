import { Injectable } from '@angular/core';

import { JobDescription } from '@interfaces/job-description.object';
import { JobMonthly } from '@interfaces/job-monthly.object';
import { ComponentStore } from '@ngrx/component-store';

export interface JobDescriptionState {
  jobsDescripts: JobDescription[];
  monthlyDescripts: JobMonthly[];
};

const defaultJobState: JobDescriptionState = {
  jobsDescripts: [],
  monthlyDescripts: [],
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{

  constructor() {
    super(defaultJobState);
  }
  readonly jobsDescripts$ = this.select((state) => state.jobsDescripts);
  readonly monthlyDescripts$ = this.select((state) => state.monthlyDescripts);

  readonly updateJobDescriptions = this.updater((state, jobsDescription: JobDescription[] | null) => ({
    ...state,
    jobsDescripts: jobsDescription || [],
  }));

  readonly updateMonthlyDescriptions = this.updater((state, monthlyBuckets: JobMonthly[] | null) => ({
    ...state,
    monthlyDescripts: monthlyBuckets || [],
  }));
}
