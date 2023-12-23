import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBarGraphComponent } from './job-bar-graph.component';

describe('JobBarGraphComponent', () => {
  let component: JobBarGraphComponent;
  let fixture: ComponentFixture<JobBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBarGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
