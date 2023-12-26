import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { JobMonthly } from '@interfaces/job-monthly.object';
import { JobsStore } from '@stores/jobs-store.store';

@Component({
  selector: 'app-job-bar-graph',
  standalone: true,
  imports: [ CanvasJSAngularChartsModule ],
  providers: [JobsStore],
  templateUrl: './job-bar-graph.component.html'
})

export class JobBarGraphComponent implements OnChanges {
  @Input() monthlyInputData: JobMonthly[] = [];
  monthlyChartOptions = {};

  constructor(private readonly jobsStore: JobsStore){}

  /**
   * @name mapChartData
   * @param monthlyData
   * @returns {label: string, y: number}[]
   * @description maps the monthly descriptions (month and count) to the labels and amounts
   * needed for chart dataPoints and returns them
   */
  private mapChartData (monthlyData: JobMonthly[]): {label: string, y: number}[] {
   let viewData = [
      { label: monthlyData[0].month,  y: monthlyData[0].jobs.length },
      { label: monthlyData[1].month,  y: monthlyData[1].jobs.length },
      { label: monthlyData[2].month,  y: monthlyData[2].jobs.length },
      { label: monthlyData[3].month,  y: monthlyData[3].jobs.length },
      { label: monthlyData[4].month,  y: monthlyData[4].jobs.length },
      { label: monthlyData[5].month,  y: monthlyData[5].jobs.length },
      { label: monthlyData[6].month,  y: monthlyData[6].jobs.length },
      { label: monthlyData[7].month,  y: monthlyData[7].jobs.length },
      { label: monthlyData[8].month,  y: monthlyData[8].jobs.length },
      { label: monthlyData[9].month,  y: monthlyData[9].jobs.length },
      { label: monthlyData[10].month, y: monthlyData[10].jobs.length },
      { label: monthlyData[11].month, y: monthlyData[11].jobs.length },
    ];
    return viewData;
  }

  /**
   * @name setMonthlyChartOptions
   * @param dataInfo of type {lable: string, y: number}[]
   * @description sets all options for the chart after recieving the dataPoints needed to create the column graph
   */
  private setMonthlyChartOptions (dataInfo: {label: string, y: number}[]) {
    this.monthlyChartOptions = {
      title: {
        text: "Job Descriptions Per Month"
      },
      data: [{
        type: "column",
        click: this.onMonthClick,
        dataPoints: dataInfo
      }]
    }
  }

  onMonthClick(e: any) {
		console.log("dataPoint label:" + e.dataPoint.label);
	}

  ngOnChanges() {
    if(this.monthlyInputData.length > 0){
      this.setMonthlyChartOptions(this.mapChartData(this.monthlyInputData));
    }
  }
}
