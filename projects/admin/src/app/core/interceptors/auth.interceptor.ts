import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url=="http://localhost:8787/api/v1/auth/authenticateAdmin"){return next.handle(request);}else{
    const newReq=request.clone({
      headers:request.headers.append('Authorization','Bearer '+ JSON.parse(localStorage.getItem('token')!).token)
    })
    
    return next.handle(newReq);}
  }
}
