import { PerformanceService } from './../../../data-services/performance.service';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';


interface Dataset {
  data: number[];
  label: string;
}

@Component({
  selector: 'pt-chart-page-loading',
  templateUrl: './chart-page-loading.component.html',
  styleUrls: ['./chart-page-loading.component.scss']
})
export class ChartPageLoadingComponent {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['MAX', 'MIN', 'AVG'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: Dataset[] = [
      { data: [], label: 'Performance [ms]' },
    ];

  constructor() { }

  public setChartData(chartData: Dataset[]) {
    this.barChartData = chartData;
    this.chart.update();
  }

}
