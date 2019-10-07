import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Color, } from 'ng2-charts';

@Component({
  selector: 'pt-chart-urls-proportions',
  templateUrl: './chart-urls-proportions.component.html',
  styleUrls: ['./chart-urls-proportions.component.scss']
})
export class ChartUrlsProportionsComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  pieChartLabels = ['UPSSS... No data ;P'];
  pieChartData = [1];
  pieChartType = 'pie';
  pieChartColors =  [{ backgroundColor: ['rgba(110, 114, 20, .5)'] }];

  constructor() { }

  ngOnInit() {
    this.updateColors();
  }

  public setChartData(data: number[], labels: string[]) {
    this.pieChartData = data;
    this.pieChartLabels = labels;
    this.updateColors();
    this.chart.update();
  }

  private updateColors() {
    for (let id = this.pieChartColors[0].backgroundColor.length; id < this.pieChartData.length; id++) {
      const genColor = () => Math.round(Math.random() * 255);
      const newColor = `rgba(${genColor()}, ${genColor()}, ${genColor()}, 0.3)`;
      this.pieChartColors[0].backgroundColor.push(newColor);
    }
  }
}
