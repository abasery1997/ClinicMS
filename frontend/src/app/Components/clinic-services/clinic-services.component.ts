import { Component, OnInit ,OnDestroy } from '@angular/core';
import { ClinicService } from 'src/app/Services/clinic.service';
import { ClinicServiceClass } from '../Model/clinic-service';
import { Subject } from 'rxjs';


declare var $:any;

@Component({
  selector: 'app-clinic-services',
  templateUrl: './clinic-services.component.html',
  styleUrls: ['./clinic-services.component.css']
})
export class ClinicServicesComponent implements OnInit  {

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private clinicService:ClinicService) { }
  selected:boolean = true;
  service:ClinicServiceClass=new ClinicServiceClass('0','',1);
  services:ClinicServiceClass[]=[];  

  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      searching:true,
      paging:true,
      responsive:true
    };
    this.clinicService.getAllServices().subscribe(res=>{
      this.services=res;
      this.dtTrigger.next();
    })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  editService:boolean=false;
  setClinicService(s:ClinicServiceClass){
    this.service=s;
    this.editService=true;
  }
  addService(amount:string,name:string){
    this.service.name=name;
    this.service.invoiceAmount=Number(amount);
    if(!this.editService)
    {

      this.clinicService.AddService(this.service).subscribe(res=>{
        this.clinicService.getAllServices().subscribe(r=>{
          this.services=r;
        })
      });
    }
    else{
      
    this.clinicService.UpdateService(this.service).subscribe(res=>{
      this.clinicService.getAllServices().subscribe(r=>{
        this.services=r;
      })
    });
    }
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
