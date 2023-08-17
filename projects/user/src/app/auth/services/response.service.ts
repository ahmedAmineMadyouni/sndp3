import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  private taskSubject = new BehaviorSubject<any>(null);
  public taskData$ = this.taskSubject.asObservable();

  private notAprovedDemandeSubject = new BehaviorSubject<any>(null);
  public notAprovedDemandeData$ = this.notAprovedDemandeSubject.asObservable();

  private aprovedDemandeSubject = new BehaviorSubject<any>(null);
  public aprovedDemandeData$ = this.aprovedDemandeSubject.asObservable();

  private notAprovedDeclarationAccidentSubject = new BehaviorSubject<any>(null);
  public notAprovedDeclarationAccidentData$ = this.notAprovedDeclarationAccidentSubject.asObservable();

  private notAprovedDeclarationAmendesSubject = new BehaviorSubject<any>(null);
  public notAprovedDeclarationAmendesData$ = this.notAprovedDeclarationAmendesSubject.asObservable();

  





  

  constructor() { }

  public setData(data: []): void {
    this.dataSubject.next(data);
    console.log(this.data$)
    console.log(this.dataSubject)
  }

  
  public setTaskData(data: []): void {
    this.taskSubject.next(data);
   
  }

  
  public setNotAprovedDemandeData(data: []): void {
    this.notAprovedDemandeSubject.next(data);
    
  }

  
  public setAprovedDemandeData(data: []): void {
    this.aprovedDemandeSubject.next(data);
    
  }

  
  public setNotAprovedDeclarationAccidentData(data: []): void {
    this.notAprovedDeclarationAccidentSubject.next(data);
    
  }

  
  public setNotAprovedDeclarationAmendesData(data: []): void {
    this.notAprovedDeclarationAmendesSubject.next(data);
    
  }

}*/
@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private dataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('data')!));
  public data$ = this.dataSubject.asObservable();

  private taskSubject = new BehaviorSubject<any>(  null  /**JSON.parse(localStorage.getItem('taskData')!)*/);
  public taskData$ = this.taskSubject.asObservable();

  private notAprovedDemandeSubject = new BehaviorSubject<any>(  null  /**  JSON.parse(localStorage.getItem('notAprovedDemandeData')!)*/);
  public notAprovedDemandeData$ = this.notAprovedDemandeSubject.asObservable();

  private aprovedDemandeSubject = new BehaviorSubject<any>( null/**JSON.parse(localStorage.getItem('aprovedDemandeData')!)*/);
  public aprovedDemandeData$ = this.aprovedDemandeSubject.asObservable();

  private entretienSubject = new BehaviorSubject<any>( null/**JSON.parse(localStorage.getItem('entretienData')!)*/);
  public entretienData$ = this.entretienSubject.asObservable();


  private notAprovedDeclarationAccidentSubject = new BehaviorSubject<any>(null /**JSON.parse(localStorage.getItem('notAprovedDeclarationAccidentData')!)*/);
  public notAprovedDeclarationAccidentData$ = this.notAprovedDeclarationAccidentSubject.asObservable();

  private notAprovedDeclarationAmendesSubject = new BehaviorSubject<any>( null /**JSON.parse(localStorage.getItem('notAprovedDeclarationAmendesData')!)*/);
  public notAprovedDeclarationAmendesData$ = this.notAprovedDeclarationAmendesSubject.asObservable();

  constructor() { }

  public setData(data: []): void {
    this.dataSubject.next(data);
    console.log("el contenue mta3 data fil responseService",this.dataSubject)
    localStorage.setItem('data', JSON.stringify(data));
  }

  public setTaskData(data: []): void {
    this.taskSubject.next(data);
    console.log(this.taskData$)
    //localStorage.setItem('taskData', JSON.stringify(data));
  }

  public setNotAprovedDemandeData(data: []): void {
    this.notAprovedDemandeSubject.next(data);
    //localStorage.setItem('notAprovedDemandeData', JSON.stringify(data));
  }

  public setAprovedDemandeData(data: []): void {
    this.aprovedDemandeSubject.next(data);
    //localStorage.setItem('aprovedDemandeData', JSON.stringify(data));
  }
  public setEntretienData(data: []): void {
    this.entretienSubject.next(data);
    //localStorage.setItem('entretienData', JSON.stringify(data));
  }

  public setNotAprovedDeclarationAccidentData(data: []): void {
    this.notAprovedDeclarationAccidentSubject.next(data);
    //localStorage.setItem('notAprovedDeclarationAccidentData', JSON.stringify(data));
  }

  public setNotAprovedDeclarationAmendesData(data: []): void {
    this.notAprovedDeclarationAmendesSubject.next(data);
    //localStorage.setItem('notAprovedDeclarationAmendesData', JSON.stringify(data));
  }
}
