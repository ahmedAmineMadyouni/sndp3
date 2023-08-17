import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(model :login){
    return this.http.post("http://localhost:8787/api/v1/auth/authenticateAdmin",model);
  }
}
