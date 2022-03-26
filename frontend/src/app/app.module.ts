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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
// import { Chart } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ReportsComponent } from './Components/reports/reports.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { ClinicServicesComponent } from './Components/clinic-services/clinic-services.component';
import { DataTablesModule } from "angular-datatables";
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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
