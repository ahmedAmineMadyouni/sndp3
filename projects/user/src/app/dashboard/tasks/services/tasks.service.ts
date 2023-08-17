import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getUserMissions(id:any){
     
  
    return this.http.get(environment.baseApi+"/Mission/chauffeur/all/"+id)
  }

  getProfile(username:String){
  return this.http.get(environment.baseApi+"/Profile/user/"+username)
  }

  getMissionById(id:any){
    return this.http.get(environment.baseApi+"/Mission/"+id)
}

completeMissionById(id:any){
  return this.http.put(environment.baseApi+"/Mission/confirm/"+id,id)
}
cancelMission(id:any){
  return this.http.put(environment.baseApi+"/Mission/cancel/"+id,id)
}

startMissionById(id:any){
  return this.http.put(environment.baseApi+"/Mission/start/"+id,id)
}
completeDemandeEntretien(id:number,model:any){
  return this.http.put(environment.baseApi+"/DemandeEntretien/NotValide/setConfirmed/"+id,model)
}

cancelDemandeEntretien(id:number){
  return this.http.put(environment.baseApi+"/DemandeEntretien/NotValide/setCanceld/"+id,id)
}

startDemandeEntretien(id:any){
  return this.http.put(environment.baseApi+"/DemandeEntretien/NotValide/setInProgress/"+id,id)
}
}
