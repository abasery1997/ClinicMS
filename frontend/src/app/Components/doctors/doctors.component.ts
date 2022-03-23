import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClinicService } from 'src/app/Services/clinic.service';


import { DoctorService } from 'src/app/Services/doctor.service';
import { ClinicServiceClass } from '../Model/clinic-service';
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
  constructor(private dataService:DoctorService,private clinicService:ClinicService) { }

  doctors:Doctor[]=[];
  doctor:Doctor=new Doctor('',"1",'','','',new Date(),'','','','','',new Time(1,1),new Time(1,1));
  ngOnInit(): void {
     this.dataService.getAllDoctors().subscribe((res:any)=>{
     this.doctors=res;
    });
    this.clinicService.getAllServices().subscribe((res)=>{
      this.clinicServices=res;
    });
  }

  clinicServices:ClinicServiceClass[]=[];
  getClinicService(id:Object):string{
    let cService:ClinicServiceClass;
    for(let d of this.clinicServices){
      if(d._id==id){
        return this.clinicServices[(this.clinicServices.indexOf(d))].name;
      }
    }
    return '';
  }
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  
  addDoctor(password:string,email:string,age:string,firstname:string,lastname:string,phone:string,startTime:string,endTime:any){
    
    let startTimeA:string[]= startTime.split(':');
    let endTimeA:string[]= endTime.split(':');
    let st:Time=new Time(Number(startTimeA[0]),Number(startTimeA[1]));
    let et:Time=new Time(Number(endTimeA[0]),Number(endTimeA[1]));
    let birthDate = new Date(age);
    
  this.formData.append('firstname',firstname);
  this.formData.append('lastname',lastname);
  this.formData.append('email',email);
  this.formData.append('password',password);
  this.formData.append('phone',phone);
  this.formData.append('gender',this.gender);
  this.formData.append('birthDate',birthDate.toString());
  this.formData.append('clinicServiceID',this.ClinicServiceID.toString());
  this.formData.append('attendingDays',this.getDays());
  this.formData.append(`startTime[h]`,st.h.toString());
  this.formData.append(`startTime[m]`,st.m.toString());
  this.formData.append(`endTime[h]`,et.h.toString());
  this.formData.append(`endTime[m]`,et.m.toString());
  if(!this.edit)
  {
    this.dataService.addDoctor(this.formData).subscribe((docID)=>{
      this.dataService.getAllDoctors().subscribe((res:any)=>{
        this.doctors=res;
      })
    })
  }
  else {
    this.formData.append("image", this.doctor.image);
    this.dataService.updateDoctor(this.formData).subscribe((docID)=>{
      this.dataService.getAllDoctors().subscribe((res)=>{
        this.doctors=res;
      })
    })
  }
    
  }
  ClinicServiceID:Object='';
  setClinicServiceID(clinicService:Object)
  {
    this.ClinicServiceID=clinicService;
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
  edit:boolean=false;
  catchDoctor(doctor:Doctor){
    this.doctor=doctor;
    this.edit=true;
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
