const TESTDATA = {
  jobsByMonth: {
    month: 'JAN',
    jobs: [
      {
        "websiteTitle": "CERTARA",
        "websiteOrganization": "Certara, USA",
        "websiteLocation": "www.Certara.com",
        "websiteDatePublished": "2023-01-17T02:00:30Z"
      },
    ]
  },
  jobDescriptions: [
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
  ],
  monthlyJobDescriptions: [
    {
      month: 'JAN',
      jobs: [
        {
          "websiteTitle": "CERTARA",
          "websiteOrganization": "Certara, USA",
          "websiteLocation": "www.Certara.com",
          "websiteDatePublished": "2023-01-17T02:00:30Z"
        },
      ]
    },
    {
      month: 'FEB',
      jobs: [
        {
          "websiteTitle": "GOOGLE",
          "websiteOrganization": "ABC, Inc.",
          "websiteLocation": "www.Google.com",
          "websiteDatePublished": "2023-02-05T01:38:29Z"
        },
        {
          "websiteTitle": "TEST",
          "websiteOrganization": "TEST, Inc.",
          "websiteLocation": "www.Test.com",
          "websiteDatePublished": "2023-02-07T01:38:29Z"
        }
      ]
    },
    {
      month: 'MAR',
      jobs: [],
    },
    {
      month: 'APR',
      jobs: [],
    },
    {
      month: 'MAY',
      jobs: [],
    },
    {
      month: 'JUN',
      jobs: [],
    },
    {
      month: 'JUL',
      jobs: [],
    },
    {
      month: 'AUG',
      jobs: [],
    },
    {
      month: 'SEP',
      jobs: [],
    },{
      month: 'OCT',
      jobs: [],
    },
    {
      month: 'NOV',
      jobs: [],
    },
    {
      month: 'DEC',
      jobs: [],
    }
  ],
  monthlyChartOptions: {
    title: {
      text: "Job Descriptions Per Month"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: 'JAN', y: 1 },
        { label: 'FEB', y: 2 },
        { label: 'MAR', y: 0 },
        { label: 'APR', y: 0 },
        { label: 'MAY', y: 0 },
        { label: 'JUL', y: 0 },
        { label: 'JUN', y: 0 },
        { label: 'AUG', y: 0 },
        { label: 'SEP', y: 0 },
        { label: 'OCT', y: 0 },
        { label: 'NOV', y: 0 },
        { label: 'DEC', y: 0 },
      ]
    }]
  }
}

export default TESTDATA;
