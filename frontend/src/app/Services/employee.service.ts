import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IEmployee } from '../Components/employees/employee';
import { throwError,Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public url = "http://localhost:8080/employees";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.url)
      .pipe(catchError(this.handleError));;
  }
  addEmployee(emp: any) {
    return this.http.post(this.url, emp)
      .pipe(catchError(this.handleError));
    ;
  }
  deleteEmployee(id: any) {
    return this.http.delete(this.url, { body: { id: id }, })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, JSON.stringify(error.error));
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}