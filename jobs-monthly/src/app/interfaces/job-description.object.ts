export interface JobDescription {
  websiteTitle: string,
  websiteOrganization: string,
  websiteLocation: string,
  websiteDatePublished: string
}

export interface JobDescriptionData {
  data: {
    jobDescriptions: JobDescription[]
  }
}

export interface JobMonthly {
  month: string,
  jobs: JobDescription[],
}

export interface JobDescriptionState {
  jobsDescripts: JobDescription[];
  monthlyDescripts: JobMonthly[];
  jobsByMonth: JobMonthly;
  apiError: string | null;
  loading: boolean;
};

export enum MONTHS {
  JAN = '01',
  FEB = '02',
  MAR = '03',
  APR = '04',
  MAY = '05',
  JUN = '06',
  JUL = '07',
  AUG = '08',
  SEP = '09',
  OCT = '10',
  NOV = '11',
  DEC = '12'
}
