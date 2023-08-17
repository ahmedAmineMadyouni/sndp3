import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  private dataSubject1 = new BehaviorSubject<any>(null);
  public data1$ = this.dataSubject1.asObservable();

  private dataSubject2 = new BehaviorSubject<any>(null);
  public data2$ = this.dataSubject2.asObservable();


  

  constructor() { }

  public setData(data: any): void {
    this.dataSubject.next(data);
   // console.log(this.data$)
    //console.log(this.dataSubject)
  }

  public setData1(data: any): void {
    this.dataSubject1.next(data);
     console.log(this.data$)
    console.log(this.dataSubject)
  }

  public setData2(data: any): void {
    
    this.dataSubject2.next(data);
   console.log(this.data$)
   console.log(this.dataSubject)
  }

}
