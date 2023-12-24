import { Component } from '@angular/core';

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
export class JobContainerComponent {

  constructor(private jobService: JobsApiService ) { }

  getJobDescriptions(filter: string = 'all') {
    this.jobService.getJobDescriptions(filter).pipe(
      take(1),
      tap((data) => data),
      catchError((error) => { throw `Error Occurred: ${error}` })
    ).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error)
    })
  }

  ngOnit(){
    this.getJobDescriptions();
  }
}
