import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit , AfterViewInit{

  @ViewChild('dataTable' , {static: false})  table:any; 
  dataTable:any;
  constructor() { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  

}
