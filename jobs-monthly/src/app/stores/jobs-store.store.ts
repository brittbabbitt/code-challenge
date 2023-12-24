import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JobDescription } from '@interfaces/job-description.object';
import { ComponentStore } from '@ngrx/component-store';

export interface JobDescriptionState {
  jobsDescription: JobDescription[];
}

@Injectable()
export class JobsStore extends ComponentStore<JobDescriptionState> {

  constructor() {
    super({jobsDescription: []})
  }

  readonly jobsDescription$: Observable<JobDescription[]> = this.select(state => state.jobsDescription);
}
