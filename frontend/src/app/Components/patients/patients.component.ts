import { Component, OnInit ,AfterViewInit ,ViewChild} from '@angular/core';
import { IPatient } from './patient';
import { PatientService } from '../../Services/patient.service'

declare var $:any;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit , AfterViewInit{

  @ViewChild('dataTable' , {static: false})  table:any; 
  dataTable:any;

  constructor(private patientService:PatientService) { }
  patients:IPatient[]=[];
  patient:IPatient|null=null;

  updateTable(){
    this.patientService.getPatients().subscribe((res)=>{
      this.patients=res;
     });
  }

  ngOnInit(): void {
    this.updateTable();
 }

 
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  
  // From Doctor

  addDoctor(clinicServiceID:number,password:string,email:string,age:string,
    firstname:string,lastname:string,phone:string,image:any,startTime:string,endTime:any){


  //   let doctor:Doctor={
  //     "_id":"0",
  //     "firstname":firstname,
  //     "lastname":lastname,
  //     "email":email,
  //     "password":password,
  //     "phone":phone,
  //     "gender":this.gender,
  //     "birthDate":new Date("2013-04-23T18:25:43.511Z"),
  //     "clinicServiceID":'3',
  //     "attendingDays":this.getDays(),
  //     "startTime":st,
  //     "endTime":et,
  //     "image":this.fileName
  // };
  // this.formData.append('firstname',firstname);
  // this.formData.append('lastname',lastname);
  // this.formData.append('email',email);
  // this.formData.append('password',password);
  // this.formData.append('phone',phone);
  // this.formData.append('gender',this.gender);
  // this.formData.append('birthDate',new Date("2013-04-23T18:25:43.511Z").toString());
  // this.formData.append('clinicServiceID','1');
  // this.formData.append('attendingDays',this.getDays());
  // this.formData.append(`startTime[h]`,st.h.toString());
  // this.formData.append(`startTime[m]`,st.m.toString());
  // this.formData.append(`endTime[h]`,et.h.toString());
  // this.formData.append(`endTime[m]`,et.m.toString());
  
  //   this.dataService.addDoctor(this.formData).subscribe((docID)=>{
  //     this.dataService.getAllDoctors().subscribe((res)=>{
  //       this.doctors=res;
  //     })
  //   })
  }

  gender:string="m";
  attendingDaysValues:string[]=["sat","sun","mon","tue","wed","thu","fri"];
  attendingDays:boolean[]=[false,false,false,false,false,false,false];
  getDays():string{
    let days:string="";
    for(let i=0;i<7;i++){
      if(this.attendingDays[i]&&i!=6)
      {
        days+=this.attendingDaysValues[i];
      }
      else if(this.attendingDays[i]&&i==6)
      {
        days+=this.attendingDaysValues[i];
      }
    }
    return days;
  }


  fileName = '';
  formData = new FormData();
  file:File|null=null;
  onFileSelected(event:any) {

    this.file = event.target.files[0];
    console.log(this.file);
    if (this.file) {
        this.fileName = this.file.name;
        this.formData.append("image", this.file);
        console.log(this.formData.getAll("thumbnail"));
        console.log(this.fileName);
    }
  }

  onClick(patient:IPatient){
    this.patient=patient;
 }

 deletePatient(){
    this.patientService.deletePatient(this.patient?._id).subscribe(()=>{
      this.updateTable();
    });
  }
  
}
