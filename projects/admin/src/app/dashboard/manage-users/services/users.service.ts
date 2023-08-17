import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getProfiles(){
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Profile/all")
  }
}
