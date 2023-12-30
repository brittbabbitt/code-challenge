import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { JobsStore } from '@stores/jobs-store.store';

import { JobContainerComponent } from './job-container.component';

describe('JobContainerComponent', () => {

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
    ]
  }

  let component: JobContainerComponent;
  let fixture: ComponentFixture<JobContainerComponent>;
  let store: JobsStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobContainerComponent, HttpClientModule],
      providers: [JobsStore]
    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(JobContainerComponent);
    store = fixture.debugElement.injector.get(JobsStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setNewJobsByMonth', () => {

    it('should call setNewJobsByMonth with params only once', () => {
      const compSpy = spyOn(component, 'setNewJobsByMonth');
      component.setNewJobsByMonth('JAN');
      expect(compSpy).toHaveBeenCalledOnceWith('JAN');
    })

    it('should call the JobsStore.setNewJobsByMonth', () => {
      const storeSpy = spyOn(store, 'setNewJobsByMonth');
      component.setNewJobsByMonth('JAN');
      expect(storeSpy).toHaveBeenCalled();
    })

  });

});
