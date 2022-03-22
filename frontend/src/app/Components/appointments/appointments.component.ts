import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit , AfterViewInit {
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
