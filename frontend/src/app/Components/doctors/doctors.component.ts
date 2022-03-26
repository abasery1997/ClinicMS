import {Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';


import { DoctorService } from 'src/app/Services/doctor.service';
import { ClinicServiceClass } from '../Model/clinic-service';
import { Doctor, Time } from '../Model/doctor';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  providers:[DatePipe]
})
export class DoctorsComponent implements OnInit {


  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private dataService: DoctorService, private clinicService: ClinicService) { }

  doctors: Doctor[] = [];
  doctor: Doctor = new Doctor('', "1", '', '', '', new Date(), '', '', '', '', '', new Time(1, 1), new Time(1, 1));
  ngOnInit(): void {
    this.dtOptions = {
      searching:true,
      paging:true,
      responsive:true
    };
    this.dataService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
      this.dtTrigger.next();
    });
    this.clinicService.getAllServices().subscribe((res: any) => {
      this.clinicServices = res;
      // this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  attendingDaysValues: string[] = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];
  parseWorkingDays(days: string) {
    this.attendingDaysString = days.split(',');
    if (this.attendingDaysString.length > 1)
      this.attendingDaysString.splice(this.attendingDaysString.length - 1, 1);
    for (let i = 0; i < this.attendingDaysString.length; i++) {
      if (this.attendingDaysString[i] == "mon")
        this.attendingDaysString[i] = "Monday";
      else if (this.attendingDaysString[i] == "sat")
        this.attendingDaysString[i] = "Saturday";
      else if (this.attendingDaysString[i] == "sun")
        this.attendingDaysString[i] = "Sunday";
      else if (this.attendingDaysString[i] == "tue")
        this.attendingDaysString[i] = "Tuesday";
      else if (this.attendingDaysString[i] == "wed")
        this.attendingDaysString[i] = "Wednesday";
      else if (this.attendingDaysString[i] == "thu")
        this.attendingDaysString[i] = "Thursday";
      else
        this.attendingDaysString[i] = "Friday";
    }
  }
  calcAge(birthDate: Date): number {
    let age = 0;
    let bd = new Date(birthDate);
    let today = new Date();
    return today.getFullYear() - bd.getFullYear();
  }
  clinicServices: ClinicServiceClass[] = [];
  getClinicService(id: Object): string {
    let cService: ClinicServiceClass;
    for (let d of this.clinicServices) {
      if (d._id == id) {
        return this.clinicServices[(this.clinicServices.indexOf(d))].name;
      }
    }
    return '';
  }
 


  validateInputs: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)),
    birthDate: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    image:new FormControl('', [Validators.required]),
  });
  parseTime(time:Time):string{
    let s:string='';
    if(time.h<10)
      s='0'+time.h;
    else 
      s=time.h.toString();
    if(time.m<10)
      s+=':'+'0'+time.m;
    else
      s+=':'+time.m;
    return s;
  }
  show() {
    console.log(this.validateInputs.get('email'))
  }
  addDoctor(password: string, email: string, age: string, firstname: string, lastname: string, phone: string, startTime: string, endTime: any) {

    let startTimeA: string[] = startTime.split(':');
    let endTimeA: string[] = endTime.split(':');
    let st: Time = new Time(Number(startTimeA[0]), Number(startTimeA[1]));
    let et: Time = new Time(Number(endTimeA[0]), Number(endTimeA[1]));
    let birthDate = new Date(age);

    this.formData.append('firstname', firstname);
    this.formData.append('lastname', lastname);
    this.formData.append('email', email);
    this.formData.append('password', password);
    this.formData.append('phone', phone);
    this.formData.append('gender', this.validateInputs.get('gender')?.value);
    this.formData.append('birthDate', birthDate.toString());
    this.formData.append('clinicServiceID', this.ClinicServiceID.toString());
    this.formData.append('attendingDays', this.getDays());
    this.formData.append(`startTime[h]`, st.h.toString());
    this.formData.append(`startTime[m]`, st.m.toString());
    this.formData.append(`endTime[h]`, et.h.toString());
    this.formData.append(`endTime[m]`, et.m.toString());
    console.log(this.ClinicServiceID.toString(),"ddd"+this.gender)
    if (!this.edit) {
      this.dataService.addDoctor(this.formData).subscribe((docID) => {
        this.dataService.getAllDoctors().subscribe((res) => {
          this.doctors = res;
          this.closeForm();
          this.formData = new FormData();
        })
      },()=>{this.formData = new FormData();
        if (this.file) {
          this.fileName = this.file.name;
          this.formData.append("image", this.file);
        }})
    }
    else {
      this.formData.append('_id', this.doctor._id);
      this.dataService.updateDoctor(this.formData).subscribe((docID) => {
        this.dataService.getAllDoctors().subscribe((res) => {
          this.doctors = res;
          this.closeForm();this.validateInputs.reset();
        })
      },()=>{this.closeForm()},()=>{this.formData = new FormData();this.closeForm()})
    }

  }
  setday(d: string) {
    let index = this.attendingDaysValues.findIndex(day => day == d);
    if (index != -1)
      this.attendingDays[index] = !this.attendingDays[index];
  }
  g(e:any){
    e.reset();
  }
  closeForm() {
    this.validateInputs.reset()
    
    this.formData=new FormData();
    this.edit = false;
    this.doctor = {
      firstname:"",
      lastname:"",
      attendingDays:"",
      clinicServiceID:"",
      birthDate:new Date(),
      email:"",
      endTime:new Time(0,0),
      gender:"",
      image:"",
      password:"",
      phone:"",
      startTime:new Time(0,0),
      _id:""
    }
    this.formData = new FormData();
    this.attendingDays = [false, false, false, false, false, false, false];
  }
  ClinicServiceID: Object = '';
  setClinicServiceID(clinicService: Object) {
    this.ClinicServiceID = clinicService;
  }
  gender: string = "m";
  attendingDaysString: string[] = [];
  attendingDays: boolean[] = [false, false, false, false, false, false, false];
  getDays(): string {
    let days: string = "";
    for (let i = 0; i < 7; i++) {
      if (this.attendingDays[i] && i != 6) {
        days += this.attendingDaysValues[i] + ',';
      }
      else if (this.attendingDays[i] && i == 6) {
        days += this.attendingDaysValues[i];
      }
    }
    return days;
  }
  edit: boolean = false;
  catchDoctor(doctor: Doctor) {
    this.formData=new FormData();
    this.doctor = doctor;
    this.ClinicServiceID=this.doctor.clinicServiceID;
    console.log(this.doctor)
    this.edit = true;
    let days = doctor.attendingDays.split(',');
    if (days.length > 1)
      days.splice(days.length - 1, 1);
    let index = -1;
    for (let i = 0; i < this.attendingDaysString.length; i++) {
      index = this.attendingDaysValues.indexOf(days[i]);
      if (index != -1) {
        this.attendingDays[index] = true;
      }
    }
  }

  fileName = '';
  formData = new FormData();
  file: File | null = null;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.formData.append("image", this.file);
    }
  }
  delete() {
    this.dataService.deleteDoctor(this.doctor._id).subscribe(data => {
      for (let d of this.doctors) {
        if (d._id == this.doctor._id) {
          console.log(this.doctors.splice(this.doctors.indexOf(d), 1));
        }
      }
    });
  }
  startTime: Time = new Time(0, 0);
  setStartTime(st: string) {

    let startTimeA: string[] = st.split(':');
    this.startTime = new Time(Number(startTimeA[0]), Number(startTimeA[1]));
  }
  endTimeFlag:boolean=true;
  emailFlag:boolean=true;
  validateTime(et: string) {
    let endTimeA: string[] = et.split(':');
    let etTime: Time = new Time(Number(endTimeA[0]), Number(endTimeA[1]));
    if (etTime.h > (this.startTime.h + 1)) {
      this.endTimeFlag= true;
    }
    else 
     this.endTimeFlag= false;
  }

  selectSpeciality(id: Object): boolean {
    let _id = id.toString();
    let i = this.doctor.clinicServiceID.toString();
    return _id == i;
  }
  selectGender(s:string):boolean{
    return s==this.doctor.gender;
  }
  parseDate(d:Date):any
  {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(d, 'yyyy-MM-dd');

  }
}
