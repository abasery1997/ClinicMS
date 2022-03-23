import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { ClinicService } from 'src/app/Services/clinic.service';



declare var $:any;

@Component({
  selector: 'app-clinic-services',
  templateUrl: './clinic-services.component.html',
  styleUrls: ['./clinic-services.component.css']
})
export class ClinicServicesComponent implements OnInit , AfterViewInit {
  @ViewChild('dataTable' , {static: false})  table:any; 
  dataTable:any;
  constructor(private clinicService:ClinicService) { }

  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
}
