import {
  DatePipe,
  NgFor,
} from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

import { JobDescription } from '@interfaces/job-description.object';
import { JobMonthly } from '@interfaces/job-monthly.object';

const SAMPLEDATA: JobDescription[] = [
	{
    "websiteTitle": "CERTARA",
    "websiteOrganization": "Certara, USA",
    "websiteLocation": "www.Certara.com",
    "websiteDatePublished": "2023-01-17T02:00:30Z"
  },
  {
    "websiteTitle": "GOOGLE",
    "websiteOrganization": "ABC, Inc.",
    "websiteLocation": "www.Google.com",
    "websiteDatePublished": "2023-12-05T01:38:29Z"
  },
  {
    "websiteTitle": "TEST",
    "websiteOrganization": "Test, LLC.",
    "websiteLocation": "www.Test.com",
    "websiteDatePublished": "2023-01-05T09:18:31Z"
  },
  {
    "websiteTitle": "TINGLES",
    "websiteOrganization": "Digirang",
    "websiteLocation": "www.Digirang.com",
    "websiteDatePublished": "2023-09-27T02:20:52Z"
  },
  {
    "websiteTitle": "MULTRON",
    "websiteOrganization": "Viasia",
    "websiteLocation": "www.Viasia.com",
    "websiteDatePublished": "2023-09-06T12:20:12Z"
  },
];

@Component({
  selector: 'app-job-table',
  standalone: true,
  imports: [ DatePipe, NgFor ],
  templateUrl: './job-table.component.html'
})
export class JobTableComponent {
  @Input() monthlyInputTableData: JobMonthly | undefined;
  jobDescriptions = SAMPLEDATA;

  trackIdentity = (index: number, jobs: JobDescription) => jobs.websiteDatePublished;
}
