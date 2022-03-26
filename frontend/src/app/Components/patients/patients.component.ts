import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IPatient } from '../Model/patient';
import { PatientService } from '../../Services/patient.service'

declare var $: any;

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})

export class PatientsComponent implements OnInit, AfterViewInit {

  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;

  constructor(private patientService: PatientService) { }

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
    });
  }

  ngOnInit(): void {
    this.updateTable();
  }


  ngAfterViewInit(): void {
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }

  onFileSelected(event: any) {

    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.formData.append("image", this.file);
    }
  }


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
  }

  addButton() {
    this.closeForm();
    this.patient = {
      _id: "",
      firstname: "",
      lastname: "",
      image: "",
      birthDate: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      emergencyPhone: ""
    }
  }

}
