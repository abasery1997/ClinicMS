import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor, Time } from './doctor';

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
  ngOnInit(): void {
     this.dataService.getAllDoctors().subscribe((res)=>{
     this.doctors=res;
    });
  }

  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

   public name:string="";
  
  addDoctor(clinicServiceID:number,password:string,email:string,age:string,
    firstname:string,lastname:string,phone:string,image:string,startTime:string,endTime:any){
    let startTimeA:string[]= startTime.split(':');
    let endTimeA:string[]= startTime.split(':');
    let st:Time=new Time(Number(startTimeA[0]),Number(startTimeA[1]));
    let et:Time=new Time(Number(endTimeA[0]),Number(endTimeA[1]));
    
    let doctor:Doctor={
      "_id":"0",
      "firstname":firstname,
      "lastname":lastname,
      "email":email,
      "password":password,
      "phone":phone,
      "gender":this.gender,
      "birthDate":new Date("2013-04-23T18:25:43.511Z"),
      "clinicServiceID":3,
      "attendingDays":this.getDays(),
      "startTime":new Time(2,15),
      "endTime":new Time(2,15),
      "image":image
  };
  console.log(doctor.firstname)
    this.dataService.addDoctor(doctor).subscribe((docID)=>{
      doctor._id=docID;
      console.log(doctor);
      this.doctors.push(doctor);
    })
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

}
