import { Injectable } from '@angular/core';

import { JobDescription } from '@interfaces/job-description.object';
import { ComponentStore } from '@ngrx/component-store';
import { JobsApiService } from '@services/jobs-api.service';

export interface JobDescriptionState {
  jobsDescription: JobDescription[];
};

const defaultJobState: JobDescriptionState = {
  jobsDescription: [],
};

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState>{

  constructor( private jobService: JobsApiService ) {
    super(defaultJobState)
  }
  readonly jobsDescription$ = this.select((state) => state.jobsDescription);

  readonly updateJobDescriptions = this.updater((state, jobsDescription: JobDescription[] | null) => ({
    ...state,
    jobsDescription: jobsDescription || [], // updates with new value
  }));

}
