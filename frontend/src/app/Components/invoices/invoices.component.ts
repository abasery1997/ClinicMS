import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';


declare var $:any;


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit , AfterViewInit {

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
