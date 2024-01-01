import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { JobMonthly } from '@interfaces/job-description.object';

@Component({
  selector: 'app-job-bar-graph',
  standalone: true,
  imports: [ CanvasJSAngularChartsModule ],
  templateUrl: './job-bar-graph.component.html'
})

export class JobBarGraphComponent implements OnChanges {
  @Input() monthlyInputData: JobMonthly[] = [];
  @Output() onMonthClick = new EventEmitter<string>();

  monthlyChartOptions = {
    title: {
      text: '',
    },
    data: [{
      type: 'column',
      click: (e: any) => {},
      dataPoints: [{label: '', y: 0}]
    }]
  };

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
        text: 'Job Descriptions Per Month',
      },
      data: [{
        type: 'column',
        click: this.monthClick,
        dataPoints: dataInfo
      }]
    }
  }

  /**
   * @name monthClick
   * @param e click event from bar graph data column
   * @returns emits event of type string
   * @description click handler for bar graph clicks
   */
  monthClick = (e: any) => {
    let label = e.dataPoint.label;
    return this.onMonthClick.emit(label);
	}

  /**
   * @description checks change of monthlyInputData and updates the bar graph when needed
   */
  ngOnChanges() {
    if(this.monthlyInputData.length > 0){
      this.setMonthlyChartOptions(this.mapChartData(this.monthlyInputData));
    }
  }
}
