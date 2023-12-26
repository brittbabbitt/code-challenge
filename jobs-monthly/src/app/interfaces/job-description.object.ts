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
