import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

import {
  catchError,
  take,
  tap,
} from 'rxjs';

import { JobsApiService } from '@services/jobs-api.service';

@Component({
  selector: 'app-job-container',
  standalone: true,
  imports: [],
  templateUrl: './job-container.component.html'
})
export class JobContainerComponent implements OnInit {

  constructor(private jobService: JobsApiService,
    private http: HttpClient ) { }

  getJobDescriptions(filter: string = '') {
    this.jobService.getJobDescriptions(filter).pipe(
      take(1),
      tap((data) => data),
      catchError((error) => { throw `Error Occurred: ${error}` })
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error)
    })
  }

  ngOnInit(){
    this.getJobDescriptions();
  }
}
