import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { DataService } from '../../services/data.service';
import { ResponseService } from 'projects/user/src/app/auth/services/response.service';
import { DemandesService } from '../../../manage-demandes/services/demandes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['idMission', 'titre', 'user' ,'deadLineDate','status', 'actions'];
  dataSource :any;
  demandeData:any;
  isInputDisabled=false
  taskStatus=false
  demansdeStatus=false
  tasksFilter!:FormGroup
  newDemandeComplitationForm!:FormGroup

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},]
  constructor(private dataService: DataService,
    private resService:ResponseService,
    public dialog: MatDialog ,
    private toaster:ToastrService,
    private fb:FormBuilder,
    private service:TasksService,
    private spinner: NgxSpinnerService ,
    private demandeService:DemandesService) { }

  ngOnInit(): void {
    this.loadTaskData()
   this.loadAprovedDemandeData()
   this.createForm()
    
    //this.createform()
    //this.getAllTasks()
  }

  startTask(element:any){
    this.spinner.show()
    this.service.startMissionById(element.idMission).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.toaster.success("success","you have started this "+ element.titre+ " mission with success congratulation")
        this.spinner.hide()
        this.loadAfterUpdateTask()
      }
    },error => {
      this.toaster.error(error.error.message)
    })

  }

  cancelTask(element:any){
    if(element.missionStatus==='IN_PROGRESS'){
      this.spinner.show()
      this.service.cancelMission(element.idMission).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.toaster.success("success","you have canceled this "+ element.titre+ " mission with success congratulation")
          this.spinner.hide()
          this.loadAfterUpdateTask()
        }
      })
    }
  }
  completeTask(element:any){
    if(element.missionStatus==='IN_PROGRESS'){
      this.spinner.show()
      this.service.completeMissionById(element.idMission).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.toaster.success("success","you have completed this "+ element.titre+ " mission with success congratulation")
          this.loadAfterUpdateTask()
        }
      },error => {
        this.toaster.error(error.error.message)
      })
    }
  }

  startDemandeEntretien(element:any){
    if(element.completed==='ADMIN_APROVED'){
      this.spinner.show()
      this.service.startDemandeEntretien(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.spinner.hide()
          this.toaster.success("success","you have started the demande entretien with id :"+ element.idDemandeEntretien +" successefuly ,take care ")
          this.loadAfterUpdateDemande()
        }
      })
    }
  }
  cancelDemandeEntretien(element:any){
    if(element.completed==='IN_PROGRESS'){
      this.spinner.show()
      this.service.cancelDemandeEntretien(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.spinner.hide()
          this.toaster.success("success","you have canceled demande Entretien with id : "+ element.idDemandeEntretien+"successfully")
          this.loadAfterUpdateDemande()
        }
      })
    }

  }
  createForm(){
this.newDemandeComplitationForm=this.fb.group({
  montant:['',[Validators.required]],
  numDemandeAchat:['',[Validators.required]]
})
  }

  completeDemandeEntretien(element:any){
    if(element.completed==='IN_PROGRESS'){
      this.spinner.show()
      const formData = {
        //idAffectation: this.newAffectationform.value['idAffectation'],
        montant: this.newDemandeComplitationForm.value['montant'],
        numDemandeAchat: this.newDemandeComplitationForm.value['numDemandeAchat'],
      };
      this.service.completeDemandeEntretien(element.idDemandeEntretien,formData).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.spinner.hide()
          this.toaster.success("success","you have completed demande Entretien with id : "+ element.idDemandeEntretien+"successfully")
          this.loadAfterUpdateDemande()
        }
      })
    }
  }

  loadTaskData(){
    this.resService.taskData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getUserMissions(JSON.parse(localStorage.getItem("token")!).idAffectations).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.resService.setTaskData(res);
            this.dataSource=res
            if(this.dataSource.length === 0){
              this.taskStatus=true
            }
          }
          this.spinner.hide()
        })
      }else{
        this.dataSource=data
        console.log(this.dataSource)
      }
    })

  }
  loadAfterUpdateTask(){
    this.spinner.show()
    this.service.getUserMissions(JSON.parse(localStorage.getItem("token")!).idAffectations).pipe(take(1)).subscribe((res:any)=>{
      this.resService.setTaskData(res);
      this.dataSource=res
      this.spinner.hide()
    })
  }

  loadAfterUpdateDemande(){
    this.spinner.show()
    this.demandeService.getAllValdiatedDemande(JSON.parse(localStorage.getItem("token")!).idConducteur).pipe(take(1)).subscribe((res:any)=>{
      this.resService.setAprovedDemandeData(res)
      this.demandeData=res
      this.spinner.hide()
    })
  }
  loadAprovedDemandeData(){
    this.spinner.show()
    this.resService.aprovedDemandeData$.subscribe(data=>{
      
      if(data==null){
        
        this.demandeService.getAllValdiatedDemande(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.resService.setAprovedDemandeData(res);
            this.demandeData=res
            if(this.demandeData.length === 0){
              this.demansdeStatus=true
            }
          }
          this.spinner.hide()
        })
      }else{
        this.demandeData=data
        console.log(data)
        this.spinner.hide()
      }
    })

  }

  

  seeDetails(x:any){
    this.dataService.setData(this.dataSource[x]);
    
  }
  seeDetailsDemande(index:any){
    this.dataService.setData1(this.demandeData[index]);
  }

  /**getAllTasks() {
    this.id = JSON.parse(localStorage.getItem("token")!).idAffectations
    console.log('el id ',this.id)*/
      /**if("user-profile"in localStorage){
        this.id=JSON.parse(localStorage.getItem("user-profile")!).chauffeur.idConducteur;
        console.log("el id mta3" ,this.id)
      }
      this.service.getProfile(x).subscribe((res:any)=>{console.log("res mta3 el userprofile",res)
        let myStorage=window.localStorage;
        const str=JSON.stringify(res)
        if(str != myStorage.getItem("user-profile")){
          myStorage.setItem("user-profile",JSON.stringify(res))
        this.id = JSON.parse(localStorage.getItem("user-profile")!).chauffeur.idConducteur;
        }
    })*//**
    if("user-mission"in localStorage){
      this.dataSource=JSON.parse(localStorage.getItem("user-mission")!);
      console.log(this.dataSource)
    } */
/**if(this.id.length >2){
console.log('id')
}*//**
    this.service.getUserMissions(this.id).subscribe((res:any)=>{console.log(res)
      let myStorage=window.localStorage;
      const strr=JSON.stringify(res)
      if(strr != myStorage.getItem("user-mission")){
        myStorage.setItem("user-mission",JSON.stringify(res))
        this.dataSource=JSON.parse(localStorage.getItem("user-mission")!);
    }
  
  })

  } */
}
