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
  Subscription,
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
  private monthlyBuckets: JobMonthly[] = [];
  private jobDescriptSubscription: Subscription = new Subscription();

  public jobDescriptions$ = this.jobsStore.jobsDescripts$;
  public monthlyDescriptions$ = this.jobsStore.monthlyDescripts$;
  public jobsByMonthTable$ = this.jobsStore.jobsByMonth$;

  constructor(
    private readonly jobsStore: JobsStore
  ) {}

  /**
   * @name setInitMonthlyNames
   * @description initializes the monthlyBuckets array for each month name
   */
  private setInitMonthlyNames() {
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
   * monthlyBuckets array according to the websiteDatePublished month. Updates Store state.
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
      this.jobsStore.updateMonthlyDescriptions(this.monthlyBuckets);
    }
  }

  /**
   * @name setNewJobsByMonth
   * @param monthName
   * @description updates the Jobs Store with the Job Descriptions of month selected
   */
  setNewJobsByMonth( monthName: string) {
    this.jobsStore.setNewJobsByMonth(monthName);
  }

  ngOnInit(){
    this.jobsStore.getJobDescriptions();
    this.setInitMonthlyNames();

    this.jobDescriptSubscription = this.jobDescriptions$.pipe(
      tap((jobs: JobDescription[]) => this.addMonthlyDescriptions(jobs))
    ).subscribe();
  }

  ngOnDestroy() {
    this.jobDescriptSubscription.unsubscribe();
  }
}
