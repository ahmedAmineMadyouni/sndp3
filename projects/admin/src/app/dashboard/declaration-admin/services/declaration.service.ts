import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(private http:HttpClient) { }
  checkVoitureStillThere(id:number){
    return this.http.get(environment.baseApi+"/Entretien/check/Voiture/"+id)
  }
  checkChauffeurStillThere(id:number){ 
    return this.http.get(environment.baseApi+"/chauffeur/checkChauffeur/stillThere/"+id)
}

  getAllAccident():Observable<any>{
    return this.http.get(environment.baseApi+"/accident/all");
  }
  getAllAmendes():Observable<any>{
    return this.http.get(environment.baseApi+"/amendes/all");
  }
  updateAccident(id:number,model:any){
    return this.http.put(environment.baseApi+"/accident/update/"+id,model);
  }
  updateAmendes(id:number,model:any){
    return this.http.put(environment.baseApi+"/amendes/update/"+id,model);
  }
  deleteAccident(id:number){
    return this.http.delete(environment.baseApi+"/accident/delete/"+id);
  }
  deleteAmendes(id:number){
    return this.http.delete(environment.baseApi+"/amendes/delete/"+id);
  }
  getAllValideDeclarationAccident():Observable<any>{
    return this.http.get('http://localhost:8787/api/v1/auth/admin/DeclarationAccident/valide/all')
  }
  getAllValideDeclarationAmendes():Observable<any>{
    return this.http.get('http://localhost:8787/api/v1/auth/admin/DeclarationAmendes/valide/all')
  }

  getAllDeclarationAccident():Observable<any>{
    return this.http.get('http://localhost:8787/api/v1/auth/admin/DeclarationAccident/NotValide/all')
  }

  getAllDeclarationAmendes():Observable<any>{
    return this.http.get('http://localhost:8787/api/v1/auth/admin/DeclarationAmendes/NotValide/all')
  }

  validateAccident(model:any){
    return this.http.post('http://localhost:8787/api/v1/auth/admin/accident/validate/'+model,model)
  }

  validateAmendes(model:any){
    return this.http.post('http://localhost:8787/api/v1/auth/admin/amendes/validate/'+model,model)
  }

  cancelDeclarationAccident(id:any){
    return this.http.put(environment.baseApi+"/DeclarationAccident/cancel/"+id,id)
  }
  cancelDeclarationAmendes(id:number){
    return this.http.put(environment.baseApi+"/DeclarationAmendes/cancel/"+id,id)
  }
}
