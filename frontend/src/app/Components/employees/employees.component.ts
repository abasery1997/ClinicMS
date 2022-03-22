import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit , AfterViewInit {

  constructor() { }
  @ViewChild('dataTable' , {static: false})  table:any; 
  dataTable:any;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
}
