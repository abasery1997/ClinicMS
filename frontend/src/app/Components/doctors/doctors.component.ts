import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';


import { DoctorService } from 'src/app/Services/doctor.service';
import { Doctor, Time } from '../Model/doctor';

declare var $:any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit , AfterViewInit{


  @ViewChild('dataTable' , {static: false})  table:any; 
  dataTable:any;
  constructor(private dataService:DoctorService) { }

  doctors:Doctor[]=[];
  doctor:Doctor=new Doctor('',"1",'','','',new Date(),'','','','','',new Time(1,1),new Time(1,1));
  ngOnInit(): void {
     this.dataService.getAllDoctors().subscribe((res:any)=>{
     this.doctors=res;
     
    });
  }

  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  
  addDoctor(clinicServiceID:string,password:string,email:string,age:string,
    firstname:string,lastname:string,phone:string,image:any,startTime:string,endTime:any,edit:boolean=false){
    
    let startTimeA:string[]= startTime.split(':');
    let endTimeA:string[]= endTime.split(':');
    let st:Time=new Time(Number(startTimeA[0]),Number(startTimeA[1]));
    let et:Time=new Time(Number(endTimeA[0]),Number(endTimeA[1]));

  this.formData.append('firstname',firstname);
  this.formData.append('lastname',lastname);
  this.formData.append('email',email);
  this.formData.append('password',password);
  this.formData.append('phone',phone);
  this.formData.append('gender',this.gender);
  this.formData.append('birthDate',new Date("2013-04-23T18:25:43.511Z").toString());
  this.formData.append('clinicServiceID','1');
  this.formData.append('attendingDays',this.getDays());
  this.formData.append(`startTime[h]`,st.h.toString());
  this.formData.append(`startTime[m]`,st.m.toString());
  this.formData.append(`endTime[h]`,et.h.toString());
  this.formData.append(`endTime[m]`,et.m.toString());
  if(!edit)
  {
    this.dataService.addDoctor(this.formData).subscribe((docID)=>{
      this.dataService.getAllDoctors().subscribe((res:any)=>{
        this.doctors=res;
      })
    })
  }
  else {
    this.dataService.updateDoctor(this.formData).subscribe((docID:any)=>{
      this.dataService.getAllDoctors().subscribe((res:any)=>{
        this.doctors=res;
      })
    })
  }
    
  }

  setClinicServiceID(clinicService:string)
  {
    console.log(clinicService)
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
  catchDoctor(doctor:Doctor){
    this.doctor=doctor;
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
    }
  }
  delete(){
    this.dataService.deleteDoctor(this.doctor._id).subscribe(data => {
      
      for(let d of this.doctors){
        if(d._id==this.doctor._id){
          console.log(this.doctors.splice(this.doctors.indexOf(d),1));
        }
      }
    });
  }
}
