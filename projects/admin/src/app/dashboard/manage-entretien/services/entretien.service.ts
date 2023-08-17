import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntretienService {

  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  private dataSubject1 = new BehaviorSubject<any>(null);
  public data1$ = this.dataSubject1.asObservable();

  private dataSubject2 = new BehaviorSubject<any>(null);
  public data2$ = this.dataSubject2.asObservable();

  constructor(private http :HttpClient) { }

  getAllEntretien():Observable<any>{
    return this.http.get(environment.baseApi+"/Entretien/all")
  }

  chechVoitureStillThere(id:number){
    return this.http.get(environment.baseApi+"/Entretien/check/Voiture/"+id)
  }
  updateEntretien(id:number,model:any){
    return this.http.put(environment.baseApi+"/Entretien/update/"+id,model);
  }
  deleteEntretien(id:number){
    return this.http.delete(environment.baseApi+"/Entretien/delete/"+id)
  }
  //TODO addEntretien(model:any){
    //return this.http.post(environment.baseApi+"",model)
  //}

  getDemandeEntretienNotAprovedYet():Observable<any>{
    return this.http.get("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/all")
  }
  getAllDemandeEntretien():Observable<any>{
    return this.http.get("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/all")
  }
  getAllNotValideDemandeEntretienCanceled():Observable<any>{
    return this.http.get("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/Canceled/all")
  }
  getAllNotValideDemandeEntretienInProgress():Observable<any>{
    return this.http.get("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/InProgress/all")
  }

  getAllNotValideDemandeEntretienConfirmed():Observable<any>{
    return this.http.get("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/Confirmed/all")
  }
  validateDemande(id:any){
    return this.http.post("http://localhost:8787/api/v1/auth/admin/Entretien/create/fromdemande/"+id,id)
  }
  validateFirstValidation(id:any,idFournisseur:any){
    return this.http.put("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/firstValdation/"+id+"/"+idFournisseur,id,idFournisseur)
  }

  deleteDemandeEntretien(id:number){
    return this.http.delete(environment.baseApi+"/DemandeEntretien/delete/admin/"+id)
  }
  

  cancelDemandeEntretienAdmin(id:any){
    return this.http.put("http://localhost:8787/api/v1/auth/admin/DemandeEntretien/NotValide/setCanceld/admin/"+id,id)
  }

  public setData(data: any): void {
    this.dataSubject.next(data);
   // console.log(this.data$)
    //console.log(this.dataSubject)
  }

  public setData1(data: []): void {
    this.dataSubject1.next(data);
   // console.log(this.data$)
    //console.log(this.dataSubject)
  }


 

  
}
