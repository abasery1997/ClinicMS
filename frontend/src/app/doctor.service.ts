import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Doctor } from './Components/doctors/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctorsUrl:string='http://localHost:8080/doctors';
  constructor(private http:HttpClient) { }
  getAllDoctors(){
    return this.http.get<Doctor[]>(this.doctorsUrl)
      .pipe(catchError(this.handleError));
  }
  addDoctor(doc:Doctor){
    return this.http.post<any>(this.doctorsUrl, doc)
    .pipe(catchError(this.handleError));
  }
  
  deleteDoctor(id:string){
    return this.http.delete(this.doctorsUrl,{
      body:{id:id},
    })
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
