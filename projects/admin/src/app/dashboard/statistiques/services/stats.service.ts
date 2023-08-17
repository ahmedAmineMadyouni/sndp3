import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class statsService {
  private baseUrlAccident = 'http://localhost:8787/api/v1/auth/admin/accident/all';
  private baseUrlAmende = 'http://localhost:8787/api/v1/auth/admin/amendes/all';

  constructor(private http: HttpClient) { }

  getAccidents(): Observable<any> {
    return this.http.get(this.baseUrlAccident);
  }

  getAmendes(): Observable<any> {
    return this.http.get(this.baseUrlAmende);
  }
}
