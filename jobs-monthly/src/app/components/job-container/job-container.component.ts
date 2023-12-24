import {
  Component,
  OnInit,
} from '@angular/core';

import {
  catchError,
  take,
} from 'rxjs';

import { JobsApiService } from '@services/jobs-api.service';
import { JobsStore } from '@stores/jobs-store.store';

@Component({
  selector: 'app-job-container',
  standalone: true,
  imports: [],
  providers: [JobsStore],
  templateUrl: './job-container.component.html'
})
export class JobContainerComponent implements OnInit {
  public jobDescriptions$ = this.jobsStore.jobsDescription$;

  constructor(
    private jobService: JobsApiService,
    private readonly jobsStore: JobsStore
    ) {}

  getJobDescriptions() {
    this.jobService.getJobDescriptions().pipe(
      take(1),
      catchError((error) => { throw `Error Occurred: ${error}` })
    ).subscribe({
      next: (resp) => this.jobsStore.updateJobDescriptions(resp),
      error: (err) => console.log(err)
    })
  }

  ngOnInit(){
    this.getJobDescriptions()

    this.jobDescriptions$.subscribe(
      (x) => {
        console.log("Component: ")
        console.log(x)
      }
    )
  }
}
