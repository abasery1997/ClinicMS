import { Component, OnInit } from '@angular/core';
import { IPatient } from '../Model/patient';
import { PatientService } from '../../Services/patient.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers:[DatePipe]

})

export class PatientsComponent implements OnInit {

 

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  constructor(private patientService: PatientService) { }
  
  public style:any={
    border: "2px solid red"
  }
  patients: IPatient[] = [];
  patient: IPatient | null = null;
  edit: boolean = false;
  id:string="";
  fileName = '';
  formData = new FormData();
  file: File | null = null;

  updateTable() {
    this.patientService.getPatients().subscribe((res) => {
      this.patients = res;
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      searching:true,
      paging:true,
      responsive:true
    };
    this.updateTable();
  }


  

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.formData.append("image", this.file);
    }
  }

  validateInputs:FormGroup=new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    image:new FormControl('', [Validators.required]),
    emergencyPhone:new FormControl('',[Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),Validators.required])

  });
  
  addPatient(firstname: string, lastname: string, phone: string, emergencyPhone: string, gender: string, bdate: string, email: string, password: string) {

    this.formData.append('firstname', firstname);
    this.formData.append('lastname', lastname);
    this.formData.append('email', email);
    this.formData.append('password', password);
    this.formData.append('phone', phone);
    this.formData.append('gender', gender);
    this.formData.append('birthDate', bdate);
    this.formData.append('emergencyPhone', emergencyPhone);

    if (!this.edit) {
      this.patientService.addPatient(this.formData).subscribe(() => {
        this.updateTable();
      });
    } else {
      this.formData.append('_id', this.id);
      this.patientService.updatePatient(this.formData).subscribe(() => {
        this.updateTable();
      });
    }
  }

  onClick(patient: IPatient) {
    this.formData=new FormData();
    this.patient = patient;
    this.id=this.patient._id;
    this.edit = true;
  }

  deletePatient() {
    this.patientService.deletePatient(this.patient?._id).subscribe(() => {
      this.updateTable();
    });
  }

  calcAge(birthDate: any) {
    let bd = new Date(birthDate);
    let today = new Date();
    return today.getFullYear() - bd.getFullYear();
  }

  closeForm() {
    this.edit = false;
    this.formData=new FormData();
    this.patient={
      _id: "",
      firstname: "",
      lastname: "",
      image: "",
      birthDate: new Date,
      email: "",
      password: "",
      gender: "",
      phone: "",
      emergencyPhone:""
    }
    this.validateInputs.reset();
  }

  addButton(){
    this.edit = false;
    this.validateInputs.reset();
    this.formData=new FormData();
  }
  parseDate(d:Date|any):any
  {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(d, 'yyyy-MM-dd');

  }


}
