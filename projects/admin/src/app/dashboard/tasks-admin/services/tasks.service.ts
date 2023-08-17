import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

 
  constructor(private http:HttpClient) { }
  getTasks(){
    
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Mission/all");
  }
 

  getStartedTasks(){
    
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Mission/inProgress/all");
  }

  getCanceledTasks(){
    
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Mission/canceled/all");
  }

  getConfirmedTasks(){
    
    return this.http.get("http://localhost:8787/api/v1/auth/admin/Mission/success/all");
  }

  

  cancelMissionById(id:any){
    return this.http.put("http://localhost:8787/api/v1/auth/admin/Mission/cancelAdmin/"+id,id)
  }

 

 

  addTask(model:any){
    return this.http.post("http://localhost:8787/api/v1/auth/admin/Mission/create",model)
  }
  updateTask(id:number,model:any){
    return this.http.put(environment.baseApi+"/Mission/update/"+id,model)
  }
  deleteTask(id:number){
    return this.http.delete(environment.baseApi+"/Mission/delete/"+id)
  }


  
}
