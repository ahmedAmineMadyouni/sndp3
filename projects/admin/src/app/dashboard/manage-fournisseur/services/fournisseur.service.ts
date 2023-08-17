import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http:HttpClient) { }

  getFournisseur(){
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Fournisseur/all")

  }
  checkFournisseur(id:number){
    return this.http.get(environment.baseApi+"/Fournisseur/by/entretien/"+id)
  }
  updateFournisseur(id:number,model:any){
    return this.http.put(environment.baseApi+"/Fournisseur/update/"+id,model)
  }
  deleteFournisseur(id:number){
    return this.http.delete(environment.baseApi+"/Fournisseur/delete/"+id)
  }
  addFournisseur(model:any){

    return this.http.post("http://localhost:8787/api/v1/auth/admin/Fournisseur/create",model);
  }
}
