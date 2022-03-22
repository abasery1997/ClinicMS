import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';


declare var $:any;


@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit , AfterViewInit {

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
