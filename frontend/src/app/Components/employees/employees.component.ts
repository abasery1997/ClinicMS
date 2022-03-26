import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { EmployeeService } from '../../Services/employee.service';
import { IEmployee } from '../Model/employee';

declare var $: any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers:[DatePipe]
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employees: IEmployee[] = [];
  employee: IEmployee | null = null;
  id:string="";
  edit: Boolean = false;
  fileName = '';
  formData = new FormData();
  file: File | null = null;

  constructor(private employeeService: EmployeeService) { }
  
  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;

  updateTable() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
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

  validateInputs:FormGroup=new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    image:new FormControl('', [Validators.required]),
  });

  addEmployee(firstName: string, lastName: string, phone: string, birthDate: string, email: string, password: string, gender: string) {

    this.formData.append("firstname", firstName);
    this.formData.append("lastname", lastName);
    this.formData.append("phone", phone);
    this.formData.append("birthDate", birthDate);
    this.formData.append("email", email);
    this.formData.append("password", password);
    this.formData.append("gender", gender);


    if (!this.edit) {
      this.employeeService.addEmployee(this.formData).subscribe((res: any) => {
        this.updateTable();
      });
    }else{
      this.formData.append("_id", this.id);
      this.employeeService.updateEmployee(this.formData).subscribe((res: any) => {
        this.updateTable();
      });
    }

  }

  onClick(employee: IEmployee) {
    this.formData=new FormData();
    this.edit = true;
    this.employee = employee;
    this.id=employee._id;
  }


  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee?._id).subscribe(() => {
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
    this.employee={
      _id: "",
      firstname: "",
      lastname: "",
      image: "",
      birthDate: new Date,
      email: "",
      password: "",
      gender: "",
      phone: "",
    }
    this.validateInputs.reset();
  }

  addButton(){
    this.edit = false;
    this.formData=new FormData();
    this.validateInputs.reset();
  }
  parseDate(d:Date|any):any
  {
    const datepipe: DatePipe = new DatePipe('en-US');
    return datepipe.transform(d, 'yyyy-MM-dd');

  }
}
