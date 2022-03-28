import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth :AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (window.location.href.indexOf("Home") == -1   && window.location.href.indexOf("Login") == -1)  {
      request = request.clone({
          setHeaders: { Authorization: `${this.auth.getToken()}` }
      });
  }
    return next.handle(request);
  }
}
