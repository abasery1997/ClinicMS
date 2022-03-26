import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorsComponent } from './Components/doctors/doctors.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { HomeComponent } from './Components/home/home.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ClinicServicesComponent } from './Components/clinic-services/clinic-services.component';
import { LoginComponent } from './Components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Doctors', component: DoctorsComponent },

  { path: 'Employees', component: EmployeesComponent },
  { path: 'Appointments', component: AppointmentsComponent },
  { path: 'Reports', component: ReportsComponent },

  { path: 'Patients', component: PatientsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Services', component: ClinicServicesComponent },


  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
