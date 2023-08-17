import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarationDetailsService {
  private declarationAccidentDetailsSubject = new BehaviorSubject<any>(null);
  public declarationAccidentDetailsData$ = this.declarationAccidentDetailsSubject.asObservable();

  private declarationAmendesDetailsSubject = new BehaviorSubject<any>(null);
  public declarationAmendesDetailsData$ = this.declarationAmendesDetailsSubject.asObservable();



  constructor() { }


  public setDeclarationAccidentDetailsData(data: any): void {
    this.declarationAccidentDetailsSubject.next(data);
   // console.log(this.data$)
    //console.log(this.dataSubject)
  }

  public setDeclarationAmendesDetailsData(data: any): void {
    this.declarationAmendesDetailsSubject.next(data);
   // console.log(this.data$)
    //console.log(this.dataSubject)
  }

 
}
