import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import { Appointment } from '../Components/Model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentsUrl:string='http://localhost:8080/appointments';
  constructor(private http:HttpClient) { }
  getAllAppointments(){
    return this.http.get<Appointment[]>(this.appointmentsUrl)
      .pipe(catchError(this.handleError));
  }
 
  addAppointment(app:Appointment)
  {
    return this.http.post(this.appointmentsUrl,app).pipe(catchError(this.handleError));
  }
 
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, JSON.stringify(error.error));
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
