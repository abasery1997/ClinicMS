import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Layout/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DoctorsComponent } from './Components/doctors/doctors.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
// import { Chart } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ReportsComponent } from './Components/reports/reports.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { ClinicServicesComponent } from './Components/clinic-services/clinic-services.component';
import { PrescriptionsComponent } from './Components/prescriptions/prescriptions.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NotFoundComponent,
    DoctorsComponent,
    EmployeesComponent,
    AppointmentsComponent,
    ReportsComponent,
    PatientsComponent,
    ClinicServicesComponent,
    PrescriptionsComponent,
    InvoicesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
