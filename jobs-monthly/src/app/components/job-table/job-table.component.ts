import {
  DatePipe,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

import { JobDescription } from '@interfaces/job-description.object';
import { JobMonthly } from '@interfaces/job-monthly.object';

@Component({
  selector: 'app-job-table',
  standalone: true,
  imports: [ DatePipe, NgFor, NgIf, TitleCasePipe ],
  templateUrl: './job-table.component.html'
})
export class JobTableComponent {
  @Input() monthlyInputTableData: JobMonthly | undefined;

  trackIdentity = (index: number, jobs: JobDescription) => jobs.websiteDatePublished;
}
