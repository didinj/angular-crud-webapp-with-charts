import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset, LabelItem } from 'chart.js';
import { ApiService } from '../api.service';
import { Statistic } from '../statistic';

@Component({
  selector: 'app-cases-stat',
  templateUrl: './cases-stat.component.html',
  styleUrls: ['./cases-stat.component.scss']
})
export class CasesStatComponent {
  stats: Statistic[] = [];
  label = 'Positive';
  isLoadingResults = true;
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: LabelItem[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [{ data: [], backgroundColor: [], label: this.label }];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getStatistic(this.label);
  }

  getStatistic(status: string) {
    this.barChartData = [{ data: [], backgroundColor: [], label: this.label }];
    this.barChartLabels = [];
    this.api.getStatistic(status).subscribe({
      next: (res) => {
        this.stats = res;
        const chartdata: number[] = [];
        const chartcolor: string[] = [];
        this.stats.forEach((stat) => {
          this.barChartLabels.push(stat._id.date);
          chartdata.push(stat.count);
          if (this.label === 'Positive') {
            chartcolor.push('rgba(255, 165, 0, 0.5)');
          } else if (this.label === 'Dead') {
            chartcolor.push('rgba(255, 0, 0, 0.5)');
          } else {
            chartcolor.push('rgba(0, 255, 0, 0.5)');
          }
        });
        this.barChartData = [{ data: chartdata, backgroundColor: chartcolor, label: this.label }];
        this.isLoadingResults = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoadingResults = false;
      },
      complete: () => console.info('complete')
    });
  }

  changeStatus() {
    this.isLoadingResults = true;
    this.getStatistic(this.label);
  }
}
