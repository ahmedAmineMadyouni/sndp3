import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(private http:HttpClient) { }
  login(model :any){
    return this.http.post("http://localhost:8787/api/v1/auth/authenticate",model);
  }
}
