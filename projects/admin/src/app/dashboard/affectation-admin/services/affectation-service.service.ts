import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationServiceService {

  constructor(private http:HttpClient) { }

  

 
  getNotAffectedVoiture(){
    return this.http.get(environment.baseApi+ "/Voiture/not/all")
  }

  getNotAffectedChauffeur(){
    return this.http.get(environment.baseApi+ "/chauffeur/not/all")
  }
  checkChauffeur(id:number){
    return this.http.get(environment.baseApi+"/chauffeur/check/"+id);
  }
  checkVoitureStatus(idAffectation:any){
    return this.http.get(environment.baseApi+"/Mission/voitureStatus/"+idAffectation)
  }

  getAffectation(){
    return this.http.get(environment.baseApi+"/affectationvoiture/all");
  }
  checkAffectation(id:number){
    return this.http.get(environment.baseApi+"/affectationvoiture/check/"+id)
  }

  addAffectation(model:any){
    return this.http.post("http://localhost:8787/api/v1/auth/admin/affectationvoiture/create",model)
  }

  updateAffectation(id:number,model:any){
    return this.http.put("http://localhost:8787/api/v1/auth/admin/AffectationVoiture/update/"+id,model);
  }

  deleteAffectation(id:number){
    return this.http.delete(environment.baseApi+ "/affectationvoiture/delete/" +id);
  }
}
