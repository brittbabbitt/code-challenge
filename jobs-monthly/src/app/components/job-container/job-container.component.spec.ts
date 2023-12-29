import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { JobsApiService } from '@services/jobs-api.service';
import { JobsStore } from '@stores/jobs-store.store';

import { JobContainerComponent } from './job-container.component';

describe('JobContainerComponent', () => {
  const MockJobsStoreSpy = jasmine.createSpyObj('JobsStore', [
    'getJobDescriptions',
    'setNewJobsByMonth',
  ]);

  const MockJobsApiService = jasmine.createSpyObj('JobsApiService', ['getJobDescriptions']);

  let component: JobContainerComponent;
  let fixture: ComponentFixture<JobContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobContainerComponent, HttpClientModule],
      providers: [
        {provider: JobsStore, useValue: MockJobsStoreSpy},
        {provider: JobsApiService, useValue: MockJobsApiService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
