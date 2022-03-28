import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  LoginUrl: string = 'http://localHost:8080/login';
  constructor(private http: HttpClient) { }
  login(email: String, password: String,type:String) {
    return this.http.post<any>(this.LoginUrl, { email, password,type })
    .pipe(catchError(this.handleError));
  }

  setHeaders() {
    return {
      headers: {
        authorization: this.getToken()!
      }
    }
  }
  getToken(){
    return window.localStorage.getItem('token');
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


