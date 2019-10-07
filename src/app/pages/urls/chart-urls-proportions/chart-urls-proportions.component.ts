import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'pt-chart-urls-proportions',
  templateUrl: './chart-urls-proportions.component.html',
  styleUrls: ['./chart-urls-proportions.component.scss']
})
export class ChartUrlsProportionsComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  public pieChartLabels = ['UPSSS... No data ;P'];
  public pieChartData = [1];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
  }

  public setChartData(data: number[], labels: string[]) {
    this.pieChartData = data;
    this.pieChartLabels = labels;
    this.chart.update();
  }

}
