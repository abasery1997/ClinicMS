import { AfterViewInit, Component, OnInit, ViewChild  } from '@angular/core';
import { ClinicService } from 'src/app/Services/clinic.service';
import { ClinicServiceClass } from '../Model/clinic-service';



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

  service:ClinicServiceClass=new ClinicServiceClass('0','',1);
  services:ClinicServiceClass[]=[];  
  ngOnInit(): void {
    this.clinicService.getAllServices().subscribe(res=>{
      this.services=res;
    })
  }
  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  setClinicService(s:ClinicServiceClass){
    this.service=s;
  }

  delete() {
    this.clinicService.delete(this.service._id).subscribe(data => {

      for (let d of this.services) {
        if (d._id == this.service._id) {
          this.services.splice(this.services.indexOf(d), 1);
        }
      }
    });
  }
}
