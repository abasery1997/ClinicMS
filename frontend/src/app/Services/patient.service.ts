import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPatient } from '../Components/patients/patient';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  public url = "http://localhost:8080/Patients";

  getPatients():Observable<IPatient[]>{
    return this.http.get<IPatient[]>(this.url).pipe(catchError(this.handleError));
  }

  addPatient(patient:any){
    return this.http.post(this.url,patient).pipe(catchError(this.handleError))
  }

  updatePatient(patient:any){
    return this.http.put(this.url,patient).pipe(catchError(this.handleError))
  }

  deletePatient(id:any){
    return this.http.delete(this.url,{body:{_id:id}}).pipe(catchError(this.handleError));
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
