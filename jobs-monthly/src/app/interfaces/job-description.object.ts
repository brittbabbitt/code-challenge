/**
 * @name JobDescription
 * @description defines the information for job descriptions
 */
export interface JobDescription {
  websiteTitle: string,
  websiteOrganization: string,
  websiteLocation: string,
  websiteDatePublished: string
}

/**
 * @name JobDescriptionData
 * @description defines the data coming back from the api request
 */
export interface JobDescriptionData {
  data: {
    jobDescriptions: JobDescription[]
  }
}

/**
 * @name JobMonthly
 * @description defines the job descriptions organized via month
 */
export interface JobMonthly {
  month: string,
  jobs: JobDescription[],
}

/**
 * @name JobDescriptionState
 * @description defines the job descriptions state for the Jobs Store
 */
export interface JobDescriptionState {
  jobsDescripts: JobDescription[];
  monthlyDescripts: JobMonthly[];
  jobsByMonth: JobMonthly;
  apiError: string | null;
  loading: boolean;
};

/**
 * @name MONTHS
 * @description enum mapping 3 uppercased chars to two diggit numbers
 * for mapping ISO 8601 Month Dates
 */
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
