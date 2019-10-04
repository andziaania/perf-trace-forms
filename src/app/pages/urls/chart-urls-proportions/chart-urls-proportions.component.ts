import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pt-chart-urls-proportions',
  templateUrl: './chart-urls-proportions.component.html',
  styleUrls: ['./chart-urls-proportions.component.scss']
})
export class ChartUrlsProportionsComponent implements OnInit {

  public pieChartLabels = ['01', '02', '03', '04'];
  public pieChartData = [231, 354, 53, 42];
  public pieChartType = 'pie';

  constructor() { }

  ngOnInit() {
  }

}
