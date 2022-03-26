import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PatientService } from 'src/app/Services/patient.service';
import { IPatient } from 'src/app/Components/Model/patient';
import { InvoicesService } from 'src/app/Services/invoices.service';
import { Invoice } from '../Model/invoice';
import { Subject } from 'rxjs';
import { DataTablesModule } from "angular-datatables";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private patient:PatientService,private invoiceService:InvoicesService){}
  invoices:Invoice[]=[];
  doctorInvoices:Invoice[]=[];
  patientInvoices:Invoice[]=[];
  
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      searching:true,
      paging:true,
      responsive:true
    };
    this.patient.getPatients().subscribe(res=>{
      this.patients=res;
      this.patients.forEach((p)=>{
        if(p.gender=='m')
          this.malesNumber++;
        else
          this.femalesNumber++;
      })
    });
    this.invoiceService.getAllInvoices().subscribe({
      next:res=>{
        this.invoices=this.patientInvoices=this.doctorInvoices=res;
      }
    });
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  patients:IPatient[]=[];
  malesNumber:number=0;
  femalesNumber:number=0;
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  
  show():ChartData<'pie', number[], string | string[]>{
    
    return this.genderChartData = {
      labels: ['Females', 'Males'],
      datasets: [{
        data: [this.femalesNumber, this.malesNumber]
      }]
    };
  }
  // Gender Report
  public genderChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Females', 'Males'],
    datasets: [{
      data: [15, 15]
    }]
  };
  public genderChartType: ChartType = 'pie';
  // Income Report
  public incomeChartData: ChartData<'line', number[], string | string[]> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [15000, 17900, 15900, 16400, 14300, 12100, 13000, 9800, 10000, 15530, 16500, 14000], label: 'Income'
    }]
  };
  public incomeChartType: ChartType = 'line';
  calcIncomePerMonth():ChartData<'line', number[], string | string[]>{
    let income:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
    this.invoices.forEach((invoice)=>{
      let month=new Date(this.invoices[0].appDate).getMonth();
      for(let i=0;i<12;i++)
      {
        if(i == month)
        {
          income[i]+=Number(invoice.clinicServiceAmount);
        }
      }
    });
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        data: income, label: 'Income'
      }]
    };
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}

  //   changeLabels(): void {
  //     const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
  //       'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
  //       'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
  //       'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
  //       'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
  //     const randomWord = () => words[Math.trunc(Math.random() * words.length)];
  //     this.pieChartData.labels = new Array(3).map(_ => randomWord());

  //     this.chart?.update();
  //   }

  //   addSlice(): void {
  //     if (this.pieChartData.labels) {
  //       this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
  //     }

  //     this.pieChartData.datasets[0].data.push(400);

  //     this.chart?.update();
  //   }

  //   removeSlice(): void {
  //     if (this.pieChartData.labels) {
  //       this.pieChartData.labels.pop();
  //     }

  //     this.pieChartData.datasets[0].data.pop();

  //     this.chart?.update();
  //   }

  //   changeLegendPosition(): void {
  //     if (this.pieChartOptions?.plugins?.legend) {
  //       this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
  //     }

  //     this.chart?.render();
  //   }

  //   toggleLegend(): void {
  //     if (this.pieChartOptions?.plugins?.legend) {
  //       this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
  //     }

  //     this.chart?.render();
  //   }
