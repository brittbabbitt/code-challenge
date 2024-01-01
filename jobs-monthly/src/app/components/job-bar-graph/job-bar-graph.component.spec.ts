import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import TESTDATA from '@components/mockData.test';

import { JobBarGraphComponent } from './job-bar-graph.component';

describe('JobBarGraphComponent', () => {
  let component: JobBarGraphComponent;
  let fixture: ComponentFixture<JobBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobBarGraphComponent, CanvasJSAngularChartsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    fixture.destroy();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {

    beforeEach(() => {
      component.monthlyInputData = TESTDATA.monthlyJobDescriptions;
      component.ngOnChanges();
      fixture.detectChanges();
    });

    it('should set monthlyChartOptions', () => {
      expect(component.monthlyChartOptions).toBeTruthy();
    });

    it('should set monthlyChartOptions title', () => {
      expect(component.monthlyChartOptions.title.text).toBe(TESTDATA.monthlyChartOptions.title.text);
    });

    it('should set monthlyChartOptions data.dataPoints', () => {
      expect(component.monthlyChartOptions.data[0].dataPoints.length).toBe(TESTDATA.monthlyJobDescriptions.length);
      expect(component.monthlyChartOptions.data[0].dataPoints.length).toBe(TESTDATA.monthlyChartOptions.data[0].dataPoints.length);
    });

    it('should have first dataPoint label as JAN', () => {
      expect(component.monthlyChartOptions.data[0].dataPoints[0].label).toBe('JAN');
    });

    it('should have one record for dataPoint label JAN', () => {
      expect(component.monthlyChartOptions.data[0].dataPoints[0].y).toBe(1);
    });

  });

  describe('monthClick', () => {

    it('should make onMonthClick emit a lable value', () => {
      const onMonthClickSpy = spyOn(component.onMonthClick, 'emit');
      const e = {
        dataPoint: {
          lable: 'JAN'
        }
      }

      component.monthClick(e);
      expect(onMonthClickSpy).toHaveBeenCalledTimes(1);
    });

  });
});
