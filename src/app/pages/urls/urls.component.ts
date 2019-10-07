import { UrlsService } from './../../data-services/urls.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UrlStatistics } from 'src/app/shared/types/url-statistics';
import { ChartUrlsProportionsComponent } from './chart-urls-proportions/chart-urls-proportions.component';

@Component({
  selector: 'pt-urls',
  templateUrl: './urls.component.html',
  styleUrls: ['./urls.component.scss']
})
export class UrlsComponent implements AfterViewInit {

  private urlsStatistics: UrlStatistics[];

  @ViewChild(ChartUrlsProportionsComponent, {static: false}) chartUrlsProportions: ChartUrlsProportionsComponent;

  constructor(private urlsService: UrlsService) { }

  ngAfterViewInit() {
    this.urlsService.getUrlsOrdered()
    .pipe(

    ).subscribe(statistics => {
      this.urlsStatistics = statistics;
      this.chartUrlsProportions.setChartData(this.getData(statistics), this.getLabels(statistics));
    });

  }

  private getData(urlsStatistics: UrlStatistics[]): number[] {
    return urlsStatistics.map(urlStat => urlStat.counter);
  }

  private getLabels(urlsStatistics: UrlStatistics[]): string[] {
    return urlsStatistics.map((urlStat) => urlStat.path);
  }

}
