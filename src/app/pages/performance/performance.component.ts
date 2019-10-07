import { ChartPageLoadingComponent } from './chart-page-loading/chart-page-loading.component';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { PerformanceService } from 'src/app/data-services/performance.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pt-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements AfterViewInit {

  @ViewChild(ChartPageLoadingComponent, {static: false}) chartPageLoading: ChartPageLoadingComponent;

  constructor(private performanceService: PerformanceService) {}

  ngAfterViewInit() {
    this.performanceService.getPageLoadingStatistics().pipe(
      map((datasetTotal: number[]) => [
        { data: datasetTotal, label: `Loading Performance [ms]`},
      ])
    ).subscribe((newData) => this.chartPageLoading.setChartData(newData));
  }
}
