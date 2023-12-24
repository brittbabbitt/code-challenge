import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JobDescription } from '@interfaces/job-description.object';

@Injectable({
  providedIn: 'root'
})
export class JobsApiService {

  constructor(private http: HttpClient) { }

  getJobDescriptions(filter: string): Observable<JobDescription> {
    return this.http.get<JobDescription>(`http://dsg-api-test.k2-app.com/ats/search/${filter}`);
  }
}
