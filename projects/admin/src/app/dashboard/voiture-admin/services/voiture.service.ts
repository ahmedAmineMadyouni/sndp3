import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  
  constructor(private http:HttpClient) { }

  getVoiture(){
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Voiture/all")

  }
  createCar(model:any){

    return this.http.post("http://localhost:8787/api/v1/auth/admin/Voiture/create",model);
  }
  checkVoitureStatus(idAffectation:any){
    return this.http.get(environment.baseApi+"/Mission/voitureStatus/"+idAffectation)
  }

  updateVoiture(id:number,model:any){
    return this.http.put(environment.baseApi+"/Voiture/update/"+id,model)
  }
  deleteVoiture(id:number){
    return this.http.delete(environment.baseApi+"/Voiture/delete/"+id)
  }

}
