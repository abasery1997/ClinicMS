import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClinicService } from 'src/app/Services/clinic.service';


import { DoctorService } from 'src/app/Services/doctor.service';
import { ClinicServiceClass } from '../Model/clinic-service';
import { Doctor, Time } from '../Model/doctor';

declare var $: any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, AfterViewInit {


  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;
  constructor(private dataService: DoctorService, private clinicService: ClinicService) { }

  doctors: Doctor[] = [];
  doctor: Doctor = new Doctor('', "1", '', '', '', new Date(), '', '', '', '', '', new Time(1, 1), new Time(1, 1));
  ngOnInit(): void {
    this.dataService.getAllDoctors().subscribe((res) => {
      this.doctors = res;
    });
    this.clinicService.getAllServices().subscribe((res: any) => {
      this.clinicServices = res;
    });
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
      else if (this.attendingDaysString[i] == "we")
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
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
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
  show() {
    console.log(this.validateInputs.get('endTime'))
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
    this.formData.append('gender', this.gender);
    this.formData.append('birthDate', birthDate.toString());
    this.formData.append('clinicServiceID', this.ClinicServiceID.toString());
    this.formData.append('attendingDays', this.getDays());
    this.formData.append(`startTime[h]`, st.h.toString());
    this.formData.append(`startTime[m]`, st.m.toString());
    this.formData.append(`endTime[h]`, et.h.toString());
    this.formData.append(`endTime[m]`, et.m.toString());
    if (!this.edit) {
      this.dataService.addDoctor(this.formData).subscribe((docID) => {
        this.dataService.getAllDoctors().subscribe((res) => {
          this.doctors = res;
          this.closeForm();
        })
      },()=>{},()=>{this.formData = new FormData();})
    }
    else {
      this.formData.append('_id', this.doctor._id);
      this.dataService.updateDoctor(this.formData).subscribe((docID) => {
        this.dataService.getAllDoctors().subscribe((res) => {
          this.doctors = res;
          this.closeForm();this.validateInputs.reset()
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
    console.log(this.validateInputs.get('phone')?.valid)
    
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
    this.edit = true;
    let days = doctor.attendingDays.split(',');
    if (days.length > 1)
      days.splice(days.length - 1, 1);
    console.log(days)
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
}
