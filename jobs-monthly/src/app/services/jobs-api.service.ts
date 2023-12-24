import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  map,
  Observable,
} from 'rxjs';

import {
  JobDescription,
  JobDescriptionData,
} from '@interfaces/job-description.object';

const URL = 'http://localhost:3000/api/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobsApiService {
  constructor(private http: HttpClient) { }

  getJobDescriptions(): Observable<JobDescription[]> {
    return this.http.get<JobDescriptionData>(URL)
      .pipe(map((resp: JobDescriptionData) => resp.data.jobDescriptions));
  }
}
