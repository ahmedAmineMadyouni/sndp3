import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private http:HttpClient) { }
  getPhotoById(id:any){
    return this.http.get("http://localhost:8787/api/v1/auth/get/image/info/"+id)
  }
  getDeclarationAccident(idc:any){
    return this.http.get(environment.baseApi+"/DeclarationAccident/chauffeur/"+idc)
  }
  getDeclarationAmendes(ida:any){
    return this.http.get(environment.baseApi+"/DeclarationAmendes/chauffeur/"+ida)
  }
  addDeclarationAccident(model:any){
    return this.http.post(environment.baseApi+"/DeclarationAccident/create",model)
  }

  addDeclarationAmendes(model:any){
    return this.http.post(environment.baseApi+"/DeclarationAmendes/create",model)
  }
  updatedeclarationAmendes(id:number,model:any){
    return this.http.put(environment.baseApi+"/DeclarationAmendes/update/"+id,model);
  }
  updatedeclarationAccident(id:number,model:any){
    return this.http.put(environment.baseApi+"/DeclarationAccident/update/"+id,model);
  }
  deleteDeclarationAmendes(id:number){
    return this.http.delete(environment.baseApi+"/DeclarationAmendes/delete/"+id);
  }
  deleteDeclarationAccident(id:number){
    
    return this.http.delete(environment.baseApi+"/DeclarationAccident/delete/"+id);
  }

}
