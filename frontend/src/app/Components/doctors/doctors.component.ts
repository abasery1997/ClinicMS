import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor } from './doctor';

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

  

}
