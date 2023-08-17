import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {

  constructor(private http:HttpClient) { }

  checkChauffeur(id:number){
    return this.http.get(environment.baseApi+"/chauffeur/check/"+id);
  }

  getChauffuer(){
    return this.http.get("http://localhost:8787/api/v1/auth/admin/chauffeur/all");
  }
  addChauffeur(model:any){
    return this.http.post("http://localhost:8787/api/v1/auth/admin/chauffeur/create/img",model);
  }
  updateChauffeur(id:number,model:any){
    return this.http.put(environment.baseApi+ "/chauffeur/update/"+id,model)
  }
  deleteChauffeur(id:number){
    return this.http.delete(environment.baseApi+ "/chauffeur/delete/"+id);
  }

}
