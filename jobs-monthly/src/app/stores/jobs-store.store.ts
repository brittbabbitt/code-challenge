import { Injectable } from '@angular/core';

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
    month: '',
    jobs: []
  },
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{

  constructor() {
    super(DEFAULT_JOB_STATE);
  }
  readonly jobsDescripts$ = this.select((state) => state.jobsDescripts);
  readonly monthlyDescripts$ = this.select((state) => state.monthlyDescripts);
  readonly jobsByMonth$ = this.select((state) => state.jobsByMonth );


  //---UPDATERS---//

  readonly updateJobDescriptions = this.updater((state, jobsDescription: JobDescription[] | null) => ({
    ...state,
    jobsDescripts: jobsDescription || [],
  }));

  readonly updateMonthlyDescriptions = this.updater((state, monthlyBuckets: JobMonthly[] | null) => ({
    ...state,
    monthlyDescripts: monthlyBuckets || [],
  }));

  readonly updateJobsByMonth = this.updater((state, jobsByMonth: JobMonthly | null) => ({
    ...state,
    jobsByMonth: jobsByMonth || DEFAULT_JOB_STATE.jobsByMonth,
  }));


  //--EFFECTS--//

}
