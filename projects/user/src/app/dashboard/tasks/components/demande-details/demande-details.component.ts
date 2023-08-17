import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.scss']
})
export class DemandeDetailsComponent implements OnInit {
  data:any
  isInputDisabled=false
  newDemandeComplitationForm!:FormGroup
  
  constructor(private dataService:DataService ,
    private route: ActivatedRoute,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private service :TasksService,
    
    private fb:FormBuilder,
    private location: Location){}
  ngOnInit(): void { 
    this.loadAfterUpdateDemande()
    this.createForm()
   

}
createForm(){
this.newDemandeComplitationForm=this.fb.group({
  montant:['',[Validators.required]],
  numDemandeAchat:['',[Validators.required]]

})
}

loadAfterUpdateDemande(){
  this.spinner.show()
  this.dataService.data1$.subscribe(data => {
    this.data = data;
    console.log(data)
    this.spinner.hide()
  });
}


startDemandeEntretien(element:any){
  if(element.completed==='ADMIN_APROVED'){
    this.spinner.show()
    this.service.startDemandeEntretien(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.spinner.hide()
        this.toaster.success("success","you have started the demande entretien with id :"+ element.idDemandeEntretien +" successefuly ,take care ")
        this.dataService.setData1(res);
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
        this.goBack()
      }
    })
  }

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
        this.goBack()
      }
    },error => {
      this.toaster.error(error.error.message)
    }) 
  }
}
goBack(): void {

  this.location.back();
}



}