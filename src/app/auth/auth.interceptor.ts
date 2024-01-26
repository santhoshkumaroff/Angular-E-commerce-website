// auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from localStorage (adjust as needed)
    const token = localStorage.getItem('token');

    // Clone the request and add the Authorization header with the token
    const modifiedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Continue with the modified request
    return next.handle(modifiedRequest);
  }
}
