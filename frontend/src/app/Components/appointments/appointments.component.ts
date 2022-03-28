import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/Services/clinic.service';
import { PatientService } from 'src/app/Services/patient.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { ClinicServiceClass } from '../Model/clinic-service';
import { Doctor, Time } from '../Model/doctor';
import { IPatient } from '../Model/patient';
import { IEmployee } from '../Model/employee';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Appointment } from '../Model/appointment';
import { ToastrService } from 'ngx-toastr';
import { DynamicGrid } from '../../grid.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private clinicService: ClinicService,
    private patientService: PatientService,
    private employeeService: EmployeeService,
    private toastr: ToastrService) { }
  appointment: Appointment = new Appointment("", {}, {}, {}, new Date(), false);
  appointments: Appointment[] = [];
  employees: IEmployee[] = [];
  patients: IPatient[] = [];
  doctors: Doctor[] = [];
  clinicServices: ClinicServiceClass[] = [];

  //dynamic array
  dynamicArray: DynamicGrid[] = [];
  newDynamic: DynamicGrid = { MedicineName: "", Doses: "" };

  addRow() {
    this.newDynamic = { MedicineName: "", Doses: "" };
    this.dynamicArray.push(this.newDynamic);
    this.toastr.success('New row added successfully', 'New Row');
    console.log(this.dynamicArray);
    return true;
  }

  deleteRow(index: any) {
    if (this.dynamicArray.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  ngOnInit(): void {
    //dynamic array
    this.newDynamic = { MedicineName: "Catavast", Doses: "2" };
    this.dynamicArray.push(this.newDynamic);


    this.dtOptions = {
      searching: true,
      paging: true,
      responsive: true
    };


    this.doctorService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
      // this.dtTrigger.next();
    });
    this.clinicService.getAllServices().subscribe((res: any) => {
      this.clinicServices = res;
      // this.dtTrigger.next();
    });
    this.employeeService.getEmployees().subscribe((res: any) => {
      this.employees = res;
      // this.dtTrigger.next();
    });
    this.patientService.getPatients().subscribe((res: any) => {
      this.patients = res;
      // this.dtTrigger.next();
    });
    this.appointmentService.getAllAppointments().subscribe(res => {
      this.appointments = res;
      this.dtTrigger.next();
    });
    this.getServiceName2();
    // this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  getName(id: Object, dataArray: any): string {
    for (let obj of dataArray) {
      if (obj._id == id) {
        let name = dataArray[(dataArray.indexOf(obj))].firstname + " " + dataArray[(dataArray.indexOf(obj))].lastname;
        return name;
      }
    }
    return "";
  }
  getServiceName(id: string): string {
    let doc: Doctor = new Doctor('', "2", '', '', '', new Date(), '', '', '', '', '', new Time(1, 1), new Time(1, 1));;
    for (let obj of this.doctors) {
      if (obj._id == id) {
        doc = this.doctors[(this.doctors.indexOf(obj))];
      }
    }
    for (let d of this.clinicServices) {
      if (d._id == doc.clinicServiceID) {
        return this.clinicServices[(this.clinicServices.indexOf(d))].name;
      }
    }
    return '';
  }
  getServiceName2(): string {
    // for (let cSer of this.clinicServices) {
    //   if (cSer._id == docID) {
    //     // let name = dataArray[(dataArray.indexOf(obj))].firstname +" "+dataArray[(dataArray.indexOf(obj))].lastname;
    //     return cSer.name;
    //   }
    // }    
    let cs: ClinicServiceClass = new ClinicServiceClass('0', '', 1);
    this.clinicService.getOneServices("623c9a197dd6482a4fe8a2fa").subscribe((res: any) => {
      cs = res;
      console.log(res);
    });
    // console.log(cs.name);
    return cs.name;

  }


}
