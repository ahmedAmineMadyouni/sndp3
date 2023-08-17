import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http:HttpClient) { }

  getDemandeEntretienById(id:number){
    return this.http.get(environment.baseApi+"/DemandeEntretien/"+id)
  }

  getAllNotYetValdiatedDemande(id:any){
   return this.http.get(environment.baseApi+"/DemandeEntretien/chauffeur/"+id)
  }
  getAllValdiatedDemande(id:any){
    return this.http.get(environment.baseApi+"/DemandeEntretien/chauffeur/AdminValidated/"+id)
   }//todo
   getAllCompletedDemandeEntretien(id:number){
    return this.http.get(environment.baseApi+"/Entretien/chauffeur/"+id)
   }
  addDemandeEntretien(model:any){
    return this.http.post(environment.baseApi+"/DemandeEntretien/create",model)
  }
  updateDemandeEntretien(id:number,model:any){
    return this.http.put(environment.baseApi+"/DemandeEntretien/update/"+id,model);
  }
  deleteDemandeEntretien(id:number){
    return this.http.delete(environment.baseApi+"/DemandeEntretien/delete/"+id)
  }
  cancelDemandeEntretien(id:number){
    return this.http.put(environment.baseApi+"/DemandeEntretien/NotValide/setCanceld/"+id,id)
  }
  //startDemandeEntretien(id:number){
    //return this.http.put(environment.baseApi+"/DemandeEntretien/NotValide/setInProgress/"+id,id)
  //}
  

  

}
