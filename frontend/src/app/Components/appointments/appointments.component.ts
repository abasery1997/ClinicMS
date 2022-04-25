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
  ) { }
  appointments: Appointment[] = [];
  employees: IEmployee[] = [];
  patients: IPatient[] = [];  
  patient: IPatient ={'_id':'','birthDate':new Date(),'email':'','emergencyPhone':"",'firstname':'','gender':'','image':'','lastname':'',"password":'','phone':''};
  doctors: Doctor[] = [];
  clinicServices: ClinicServiceClass[] = [];

  doctor: Doctor = new Doctor('', '', '', '', '', new Date(), 'ss', '', '', '', '', new Time(0, 0), new Time(0, 0));
  docTimesPerday: string[] = [];
  ngOnInit(): void {
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
    // this.dtTrigger.next();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  docTimesEnable: boolean = false;

  getName(id: Object, dataArray: any): string {
    for (let obj of dataArray) {
      if (obj._id == id) {
        let name = dataArray[(dataArray.indexOf(obj))].firstname + " " + dataArray[(dataArray.indexOf(obj))].lastname;
        return name;
      }
    }
    return "";
  }
  getServiceName(id: Object): string {
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

  getDoctorByID(id: Object) {
    this.doctorService.getDoctorById(id).subscribe(res => {
      this.doctor = res as Doctor;
      this.doctor.attendingDaysArray = this.doctor.attendingDays.split(',');
      this.doctor.attendingDaysArray.splice(this.doctor.attendingDaysArray.length - 1, 1);
      });
  }

  showWorkinDays(d: any) {
    this.getDoctorByID(d.value);
    this.docTimesEnable = true;
    let date = new Date('2022-03-26');
  }

  appointmentDay:string='';
  appointmentTime:string='';
  
  showTimesPerDayForDoctor:boolean=false;
  showSelectedDay(day:any){
    this.appointmentDay=day.name;
    this.showTimesPerDayForDoctor=true;
    this.doctor.attendingDaysArray.forEach(day=>{
      let t=this.doctor.startTime;
      console.log(t.m,this.doctor.endTime.m)
      let c=0;
      while(t.h<this.doctor.endTime.h)
      {
        this.doctor.appointmentsPerDay[c++]=`${t.h}:${t.m}`;
        t.m+=30;
        if(t.m>=60){
          t.h++;
          t.m-=60;
        }
      }
    })
  }
  appointmentDate:Date=new Date();
  setAppointmentDateTime(d:any)
  {
    this.appointmentTime=d.name;
    let today=new Date();
    let days=['sun','mon','tue','wed','thu','fri','sat'];
    let i=days.indexOf(this.appointmentDay);
    let dateOfTheDay=i-today.getDay();
    console.log(dateOfTheDay,'   llllllllllllllllllllllllll')
    if(dateOfTheDay<=0)
      dateOfTheDay+=7;
    dateOfTheDay+=today.getDate();
    let month=today.getMonth()+1;
    let year=today.getFullYear();
    let ms=[1,3,5,7,8,10,12];
    if(month==2&&dateOfTheDay>28)
    {
      month++;
      dateOfTheDay-=28;
    }
    else if(ms.indexOf(month)!=-1&&dateOfTheDay>31){
      
      if(month==12)
      {
        year++;
        month=1;
      }
      else{
        month++;
      }
      console.log(dateOfTheDay)
      dateOfTheDay-=31;
    }
    else if(dateOfTheDay>30)
    {
      month++;
      dateOfTheDay-=30;
    }
    console.log(this.appointmentTime)
    console.log(dateOfTheDay,month,year)
    this.appointmentDate=new Date(`${year}-${month}-${dateOfTheDay} ${this.appointmentTime}`)
    console.log(this.appointmentDate)
  }
  addAppointmment(){
    let newapp=new Appointment('',this.doctor._id,this.employees[0]._id,this.patient._id,this.appointmentDate,false,"623a4d5ec38adf4748b17ab7")
    this.appointmentService.addAppointment(newapp).subscribe(res=>{
      newapp._id=res;
      
     this.appointmentService.getAllAppointments().subscribe(res => {
      this.appointments = res;
    });
    })
  }
  setPatient(p:any)
  {
    this.patient._id=p.value;
  }
  closeForm(){
    this.doctor = new Doctor('', '', '', '', '', new Date(), 'ss', '', '', '', '', new Time(0, 0), new Time(0, 0));
    this.docTimesPerday = [];
    this.patient ={'_id':'','birthDate':new Date(),'email':'','emergencyPhone':"",'firstname':'','gender':'','image':'','lastname':'',"password":'','phone':''};
    this.docTimesEnable=false;
    this.showTimesPerDayForDoctor=false;
  }
}
