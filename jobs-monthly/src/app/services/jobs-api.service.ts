import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
} from '@angular/core';

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
  private http: HttpClient = inject(HttpClient);

  /**
   * @name getJobDescriptions
   * @returns Observable<JobDescription[]>
   * @description http get request call for an array of JobDescriptionData
   * response is refined as Observable<JobDescription[]
   */
  getJobDescriptions(): Observable<JobDescription[]> {
    return this.http.get<JobDescriptionData>(URL)
      .pipe(map((resp: JobDescriptionData) => resp.data.jobDescriptions));
  }
}
