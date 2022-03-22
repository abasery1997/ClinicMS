import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorsComponent } from './Components/doctors/doctors.component';
import { PatientsComponent } from './Components/patients/patients.component';
import { HomeComponent } from './Components/home/home.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { AppointmentsComponent } from './Components/appointments/appointments.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ClinicServicesComponent } from './Components/clinic-services/clinic-services.component';
import { PrescriptionsComponent } from './Components/prescriptions/prescriptions.component';
import { InvoicesComponent } from './Components/invoices/invoices.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Doctors', component: DoctorsComponent },

  { path: 'Employees', component: EmployeesComponent },
  { path: 'Appointments', component: AppointmentsComponent },

  { path: 'Patients', component: PatientsComponent },
  { path: 'Services', component: ClinicServicesComponent },
  { path: 'Prescriptions', component: PrescriptionsComponent },
  { path: 'Invoices', component: InvoicesComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
