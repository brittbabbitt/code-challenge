import { JobMonthly } from './job-monthly.object';

export interface JobDescription {
  websiteTitle: string,
  websiteOrganization: string,
  websiteLocation: string,
  websiteDatePublished: string
}

export interface JobDescriptionState {
  jobsDescripts: JobDescription[];
  monthlyDescripts: JobMonthly[];
  jobsByMonth: JobMonthly;
  apiError: string | null;
};

export interface JobDescriptionData {
  data: {
    jobDescriptions: JobDescription[]
  }
}
