import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  private newTaskSubject = new BehaviorSubject<any>(null);
  public newTaskData$ = this.newTaskSubject.asObservable();

  private inProgressTaskSubject = new BehaviorSubject<any>(null);
  public inProgressTaskData$ = this.inProgressTaskSubject.asObservable();

  private canceledTaskSubject = new BehaviorSubject<any>(null);
  public canceledTaskData$ = this.canceledTaskSubject.asObservable();

  private successTaskSubject = new BehaviorSubject<any>(null);
  public successTaskData$ = this.successTaskSubject.asObservable();

  private usersSubject = new BehaviorSubject<any>(null);
  public usersData$ = this.usersSubject.asObservable();
  
  private affectationSubject = new BehaviorSubject<any>(null);
  public affectationData$ = this.affectationSubject.asObservable();

  private chauffeurSubject = new BehaviorSubject<any>(null);
  public chauffeurData$ = this.chauffeurSubject.asObservable();

  private voitureSubject = new BehaviorSubject<any>(null);
  public voitureData$ = this.voitureSubject.asObservable();

  private notAffectedChauffeurSubject = new BehaviorSubject<any>(null);
  public notAffectedChauffeurData$ = this.notAffectedChauffeurSubject.asObservable();

  private notAffectedVoitureSubject = new BehaviorSubject<any>(null);
  public notAffectedVoitureData$ = this.notAffectedVoitureSubject.asObservable();

  private notAprovedDemandeEntretienSubject = new BehaviorSubject<any>(null);
  public notAprovedDemandeEntretienData$ = this.notAprovedDemandeEntretienSubject.asObservable();

  private canceledDemandeEntretienSubject = new BehaviorSubject<any>(null);
  public canceledDemandeEntretienData$ = this.canceledDemandeEntretienSubject.asObservable();

  private inProgressDemandeEntretienSubject = new BehaviorSubject<any>(null);
  public inProgressDemandeEntretienData$ = this.inProgressDemandeEntretienSubject.asObservable();

  private successDemandeEntretienSubject = new BehaviorSubject<any>(null);
  public successDemandeEntretienData$ = this.successDemandeEntretienSubject.asObservable();

  private validatedDeclarationAccidentSubject = new BehaviorSubject<any>(null);
  public validatedDeclarationAccidentData$ = this.validatedDeclarationAccidentSubject.asObservable();

  private validatedDeclarationAmendesSubject = new BehaviorSubject<any>(null);
  public validatedDeclarationAmendesData$ = this.validatedDeclarationAmendesSubject.asObservable();

  private entretienSubject = new BehaviorSubject<any>(null);
  public entretienData$ = this.entretienSubject.asObservable();

  private fournisseurSubject = new BehaviorSubject<any>(null);
  public fournisseurData$ = this.fournisseurSubject.asObservable();

  private notValideDeclarationAccidentSubject = new BehaviorSubject<any>(null);
  public notValideDeclarationAccidentData$ = this.notValideDeclarationAccidentSubject.asObservable();

  private notValideDeclarationAmendesSubject = new BehaviorSubject<any>(null);
  public notValideDeclarationAmendesData$ = this.notValideDeclarationAmendesSubject.asObservable();

  private accidentSubject = new BehaviorSubject<any>(null);
  public accidentData$ = this.accidentSubject.asObservable();

  private amendesSubject = new BehaviorSubject<any>(null);
  public amendesData$ = this.amendesSubject.asObservable();


  private demandeEntretienSubject = new BehaviorSubject<any>(null);
  public demandeEntretien$ = this.demandeEntretienSubject.asObservable();



  

  constructor() { }

  public setNewTaskData(data: any[]): void {
    this.newTaskSubject.next(data);
    console.log(this.newTaskData$)
    console.log(this.newTaskSubject)
  }

  public setInProgressTaskData(data: any[]): void {
    this.inProgressTaskSubject.next(data);
    console.log(this.inProgressTaskData$)
    console.log(this.inProgressTaskSubject)
  }

  public setCanceledTaskData(data: any[]): void {
    this.canceledTaskSubject.next(data);
    console.log(this.canceledTaskData$)
    console.log(this.canceledTaskSubject)
  }

  public setSuccessTaskData(data: any[]): void {
    this.successTaskSubject.next(data);
    console.log(this.successTaskData$)
    console.log(this.successTaskSubject)
  }

  public setUsersData(data: any[]): void {
    this.usersSubject.next(data);
    console.log(this.usersData$)
    console.log(this.usersSubject)
  }

  public setAffectationData(data: any[]): void {
    this.affectationSubject.next(data);
    console.log(this.affectationData$)
    console.log(this.affectationSubject)
  }

  public setChauffeurData(data: any[]): void {
    this.chauffeurSubject.next(data);
    console.log(this.chauffeurData$)
    console.log(this.chauffeurSubject)
  }

  public setVoitureData(data: any[]): void {
    this.voitureSubject.next(data);
    console.log(this.voitureData$)
    console.log(this.voitureSubject)
  }

  public setNotAffectedChauffeurData(data: any[]): void {
    this.notAffectedChauffeurSubject.next(data);
    console.log(this.notAffectedChauffeurData$)
    console.log(this.notAffectedChauffeurSubject)
  }

  public setNotAffectedVoitureData(data: any[]): void {
    this.notAffectedVoitureSubject.next(data);
    console.log(this.notAffectedVoitureData$)
    console.log(this.notAffectedVoitureSubject)
  }

  public setNotAprovedDemandeEntretienData(data: any[]): void {
    this.notAprovedDemandeEntretienSubject.next(data);
    console.log(this.notAprovedDemandeEntretienData$)
    console.log(this.notAprovedDemandeEntretienSubject)
  }

  public setvalidatedDeclarationAccidentData(data: any[]): void {
    this.validatedDeclarationAccidentSubject.next(data);
    console.log(this.validatedDeclarationAccidentData$)
    console.log(this.validatedDeclarationAccidentSubject)
  }

  public setCanceledDemandeEntretienData(data: any[]): void {
    this.canceledDemandeEntretienSubject.next(data);
    console.log(this.canceledDemandeEntretienData$)
    console.log(this.canceledDemandeEntretienSubject)
  }

  public setInProgressDemandeEntretienData(data: any[]): void {
    this.inProgressDemandeEntretienSubject.next(data);
    console.log(this.inProgressDemandeEntretienData$)
    console.log(this.inProgressDemandeEntretienSubject)
  }

  public setSuccessDemandeEntretienData(data: any[]): void {
    this.successDemandeEntretienSubject.next(data);
    console.log(this.successDemandeEntretienData$)
    console.log(this.successDemandeEntretienSubject)
  }

  public setValidatedDeclarationAmendesData(data: any[]): void {
    this.validatedDeclarationAmendesSubject.next(data);
    console.log(this.validatedDeclarationAmendesData$)
    console.log(this.validatedDeclarationAmendesSubject)
  }

  public setEntretienData(data: any[]): void {
    this.entretienSubject.next(data);
    console.log(this.entretienData$)
    console.log(this.entretienSubject)
  }

  public setFournisseurData(data: any[]): void {
    this.fournisseurSubject.next(data);
    console.log(this.fournisseurData$)
    console.log(this.fournisseurSubject)
  }

  public setNotValideDeclarationAccidentData(data: any[]): void {
    this.notValideDeclarationAccidentSubject.next(data);
    console.log(this.notValideDeclarationAccidentData$)
    console.log(this.notValideDeclarationAccidentSubject)
  }

  public setNotValideDeclarationAmendesData(data: any[]): void {
    this.notValideDeclarationAmendesSubject.next(data);
    console.log(this.notValideDeclarationAmendesData$)
    console.log(this.notValideDeclarationAmendesSubject)
  }

  public setAccidentData(data: any[]): void {
    this.accidentSubject.next(data);
    console.log(this.accidentData$)
    console.log(this.accidentSubject)
  }

  public setAmendesData(data: any[]): void {
    this.amendesSubject.next(data);
    console.log(this.amendesData$)
    console.log(this.amendesSubject)
  }
  public setDemandeEntretienData(data: any[]): void {
    this.demandeEntretienSubject.next(data);
    console.log(this.demandeEntretien$)
    //console.log(this.amendesSubject)
  }

}