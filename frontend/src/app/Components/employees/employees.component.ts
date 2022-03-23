import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { IEmployee } from './employee';

declare var $: any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  employees: IEmployee[] = [];
  employee:IEmployee|null=null;
  fileName = '';
  formData = new FormData();
  file: File | null = null;
  constructor(private employeeService: EmployeeService) { }
  @ViewChild('dataTable', { static: false }) table: any;
  dataTable: any;

  updateTable(){
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

  addEmployee(firstName: string,lastName: string,phone: string,birthDate: string,email: string,password: string,gender: string){
    this.formData.append("firstname", firstName);
    this.formData.append("lastname", lastName);
    this.formData.append("phone", phone);
    this.formData.append("birthDate", birthDate);
    this.formData.append("email", email);
    this.formData.append("password", password);
    this.formData.append("gender", gender);
    this.employeeService.addEmployee(this.formData).subscribe((res:any)=>{
      this.updateTable();
    });
  }

  onClick(employee:IEmployee) {
    this.employee=employee;
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employee?._id).subscribe(()=>{
      this.updateTable();
    });
  }

}
