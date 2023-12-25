export interface JobDescription {
  websiteTitle: string,
  websiteOrganiza1on: string,
  websiteLoca1on: string,
  websiteDatePublished: string
}

export interface JobDescriptionData {
  data: {
    jobDescriptions: JobDescription[]
  }
}
