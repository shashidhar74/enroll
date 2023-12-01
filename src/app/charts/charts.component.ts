import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  barChartCanvas: any;
  constructor(private http: HttpClient) {}

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];

  ngOnInit() {
    this.http.get<Event[]>('http://localhost:8082/api/getEnrolls').subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        const eventCountMap = new Map<string, number>();
        for (let i = 0; i < this.chartdata.length; i++) {
          const eventname = this.chartdata[i].eventname;
          eventCountMap.set(eventname, (eventCountMap.get(eventname) || 0) + 1);
        }
        eventCountMap.forEach((count, eventName) => {
          this.labeldata.push(eventName);
          this.realdata.push(count);
        });

        this.RenderChart(this.labeldata, this.realdata, 'pie', 'piechart', 1200, 1200);
        
        this.RenderChart(this.labeldata, this.realdata, 'bar', 'barchart', 1200, 1200);
      }
     

    });
  }

  RenderChart(labeldata: any, maindata: any, type: any, id: any, width: number, height: number) {
    const mychart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of enrollments',
            data: maindata,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          datalabels: {
            anchor: 'end',
            align: 'end',
            color: 'black',
            font: {
              weight: 'bold',
            },
            formatter: (value: any, context: any) => {
              return value; 
            },
          },
        },
      },
    }); 
  }
}
