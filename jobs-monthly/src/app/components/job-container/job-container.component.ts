import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {
  catchError,
  Subscription,
  take,
  tap,
} from 'rxjs';

import {
  JobBarGraphComponent,
} from '@components/job-bar-graph/job-bar-graph.component';
import { JobTableComponent } from '@components/job-table/job-table.component';
import { JobDescription } from '@interfaces/job-description.object';
import {
  JobMonthly,
  MONTHS,
} from '@interfaces/job-monthly.object';
import { JobsApiService } from '@services/jobs-api.service';
import { JobsStore } from '@stores/jobs-store.store';

@Component({
  selector: 'app-job-container',
  standalone: true,
  imports: [
    AsyncPipe,
    JobBarGraphComponent,
    JobTableComponent,
    NgIf
  ],
  providers: [JobsStore, JobsApiService],
  templateUrl: './job-container.component.html'
})
export class JobContainerComponent implements OnInit, OnDestroy {
  private jobDescriptSubscription: Subscription = new Subscription();
  private monthlySubscription: Subscription = new Subscription();
  private jobsByMonthSubscription: Subscription = new Subscription();
  private monthlyBuckets: JobMonthly[] = [];

  public jobDescriptions$ = this.jobsStore.jobsDescripts$;
  public monthlyDescriptions$ = this.jobsStore.monthlyDescripts$;
  public jobsByMonthTable$ = this.jobsStore.jobsByMonth$;

  constructor(
    private readonly jobService: JobsApiService,
    private readonly jobsStore: JobsStore
  ) {}

  /**
   * @name updateStoreJobDescripts
   * @param allJobs
   * @description updates the Jobs Store with the full list of descriptions
   */
  private updateStoreJobDescripts(allJobs: JobDescription[]) {
    this.jobsStore.updateJobDescriptions(allJobs);
  }

  /**
   * @name updateStoreMonthlyDescriptions
   * @param monthBuckets
   * @description updates the Jobs Store with the Job Descriptions per month
   */
  private updateStoreMonthlyDescriptions(monthBuckets: JobMonthly[]) {
    this.jobsStore.updateMonthlyDescriptions(monthBuckets);
  }

  /**
   * @name setInitMonthlyDescriptions
   * @description initializes the monthlyBuckets array for each month
   */
  private setInitMonthlyDescriptions() {
    const monthNames = Object.keys(MONTHS).filter(x => !(parseInt(x) >= 0));
    monthNames.forEach((month) => {
      this.monthlyBuckets.push({
        month: month,
        jobs: []
      })
    });
  }

  /**
   * @name addMonthlyDescriptions
   * @param jobs
   * @description parses through the Job Descriptions via ISO 8601 Month Dates and adds them to
   * monthlyBuckets array according to the websiteDatePublished month
   */
  private addMonthlyDescriptions(jobs: JobDescription[]) {
    if( jobs.length > 0){

      jobs.forEach((item) => {
        let date = item.websiteDatePublished.split('-');
        let month = date[1]; //getting the month of ISO 8601 Timestamp

        switch(month){
          case MONTHS.JAN: this.monthlyBuckets[0].jobs.push(item);
            break;
          case MONTHS.FEB: this.monthlyBuckets[1].jobs.push(item);
            break;
          case MONTHS.MAR: this.monthlyBuckets[2].jobs.push(item);
            break;
          case MONTHS.APR: this.monthlyBuckets[3].jobs.push(item);
            break;
          case MONTHS.MAY: this.monthlyBuckets[4].jobs.push(item);
            break;
          case MONTHS.JUN: this.monthlyBuckets[5].jobs.push(item);
            break;
          case MONTHS.JUL: this.monthlyBuckets[6].jobs.push(item);
            break;
          case MONTHS.AUG: this.monthlyBuckets[7].jobs.push(item);
            break;
          case MONTHS.SEP: this.monthlyBuckets[8].jobs.push(item);
            break;
          case MONTHS.OCT: this.monthlyBuckets[9].jobs.push(item);
            break;
          case MONTHS.NOV: this.monthlyBuckets[10].jobs.push(item);
            break;
          case MONTHS.DEC: this.monthlyBuckets[11].jobs.push(item);
            break;
          default: console.log("Not a formated date, throwing out");
        }
      })
      this.updateStoreMonthlyDescriptions(this.monthlyBuckets);
    }
  }

  /**
   * @name getJobDescriptions
   * @description gets the descriptions from the service and sends them to the store
   */
  private getJobDescriptions() {
    this.jobService.getJobDescriptions().pipe(
      take(1),
      catchError((error) => { throw `Error Occurred: ${error}` })
    )
    .subscribe({
      next: (resp) => this.updateStoreJobDescripts(resp),
      error: (err) => console.log(err)
    })
  }

  ngOnInit(){
    this.getJobDescriptions();
    this.setInitMonthlyDescriptions();

    this.jobDescriptSubscription = this.jobDescriptions$.pipe(
      tap((jobs: JobDescription[]) => this.addMonthlyDescriptions(jobs))
    ).subscribe(
      // (x) => console.log("jobDescriptions$", x)
    );

    this.monthlySubscription = this.monthlyDescriptions$.subscribe(
      // (x) => console.log("monthlyDescriptions$", x)
    );

    this.jobsByMonthSubscription = this.jobsByMonthTable$.subscribe(
      (x) => console.log("jobsByMonthTable", x)
    );
  }

  ngOnDestroy() {
    this.jobDescriptSubscription.unsubscribe();
    this.monthlySubscription.unsubscribe();
  }
}
