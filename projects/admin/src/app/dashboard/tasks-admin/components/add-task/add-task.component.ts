import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { AffectationServiceService } from '../../../affectation-admin/services/affectation-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder ,
   public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private toastr: ToastrService ,
    private  service:TasksService,
    private dataservice:AdminDataService,
    private affService: AffectationServiceService) { }

 formValues:any   
 newMissionForm!:FormGroup
 userna:any []=[]

 ngOnInit(): void {
  console.log(this.data)
   this.createForm()
   this.loadAffectation();
 }
 loadAffectation(){
  this.dataservice.affectationData$.subscribe(data=>{
    
    if(data==null){
      this.affService.getAffectation().pipe(take(1)).subscribe((res:any)=>{
        this.dataservice.setAffectationData(res);
       
          this.userna=res;
        
      })
    }else{ this.userna=data}
  })

 }

 getAllProfiles(){
   if("affectation"in localStorage){
     this.userna=JSON.parse(localStorage.getItem("affectation")!)
     console.log(this.userna)
   }else{
     this.affService.getAffectation().subscribe((res:any)=>{
       let myStorage=window.localStorage;
       myStorage.setItem("affectation",JSON.stringify(res))
       this.userna=JSON.parse(localStorage.getItem("affectation")!)
     })

   }
 }

 updateTask(){
  console.log("haga")
  const formData = {
    //idAffectation: this.newAffectationform.value['idAffectation'],
    titre: this.newMissionForm.value['titre'],
    type: this.newMissionForm.value['type'],
    description: this.newMissionForm.value['description'],
    dateMission:this.newMissionForm.value['dateMission'],
    adresse:this.newMissionForm.value['adresse'],
    affectationVoiture: {idAffectation: this.newMissionForm.value['affectationVoiture']}
  };
  console.log(formData)
  this.service.updateTask(this.data.idMission,formData).subscribe((res:any)=>{
    console.log(res)
  })
  this.dialog.close(true)
 }

 createForm() {
   this.newMissionForm=this.fb.group({
     titre:[this.data?.titre ||'' , [Validators.required ]],
     type:[this.data?.type ||'' , [Validators.required ]],
     description :[this.data?.description ||'' , [Validators.required ]],
     dateMission:[this.data?.dateMission ||'' , [Validators.required ]],
     affectationVoiture : [this.data?.affectationVoiture?.idAffectation || '' , Validators.required],
     adresse:this.fb.group({
      adresse1:[this.data?.adresse?.adresse1 ||'',[Validators.required]],
      adresse2:[this.data?.adresse?.adresse2 ||'',[Validators.required]],
      codePostal:[this.data?.adresse?.codePostal ||'',[Validators.required]],
      ville:[this.data?.adresse?.ville ||'',[Validators.required]],
      pays:[this.data?.adresse?.pays ||'',[Validators.required]]
    })
   })
   this.formValues =this.newMissionForm.value

}
createTask(){
 const formData = {
   //idAffectation: this.newAffectationform.value['idAffectation'],
   titre: this.newMissionForm.value['titre'],
   type: this.newMissionForm.value['type'],
   description: this.newMissionForm.value['description'],
   dateMission:this.newMissionForm.value['dateMission'],
   adresse:this.newMissionForm.value['adresse'],
   affectationVoiture: {idAffectation: this.newMissionForm.value['affectationVoiture']}
 };
 console.log(formData)
 
 this.service.addTask( formData).pipe(take(1)).subscribe(data=>{
  this.dialog.close(true)
},error => {
  this.toastr.error(error.error.message)
}) 
}
}

