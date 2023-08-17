import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DemandesService } from '../../services/demandes.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-demandes-entretien',
  templateUrl: './add-demandes-entretien.component.html',
  styleUrls: ['./add-demandes-entretien.component.scss']
})
export class AddDemandesEntretienComponent implements OnInit {

  newDemandeForm!:FormGroup
  formValues:any
 
  constructor(private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner:NgxSpinnerService,
    public dialog: MatDialogRef<AddDemandesEntretienComponent>,
    public matDialog:MatDialog,
    private toaster:ToastrService,
    private service:DemandesService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    const idConducteur = JSON.parse(localStorage.getItem('token')!).idConducteur;
  const idVoiture = JSON.parse(localStorage.getItem('token')!).idVoiture;
    this.newDemandeForm=this.fb.group({
      obligation:[this.data?.obligation ||'' , [Validators.required ]],
      description:[this.data?.description ||'' , [Validators.required ]],
      type:[this.data?.type ||'' , [Validators.required ]],
      dateDemandes:[this.data?.dateDemandes ||'' , [Validators.required ]],
      voiture:[{value: idVoiture, disabled: true} , [Validators.required ]],
      chauffeur:[{value: idConducteur, disabled: true} , [Validators.required ]],
    });
    this.newDemandeForm.get('chauffeur')?.enable()
    this.newDemandeForm.get('voiture')?.enable()

    this.formValues =this.newDemandeForm.value
  }
  prepareFormData(){
    let newDate1=moment(this.newDemandeForm.value['dateDemandes']).format('YYYY-MM-DD')
    const FD :any={}
    Object.entries(this.newDemandeForm.value).forEach(([key,value]:any) => {
      if(key=='dateDemandes'){
        FD[key ]=newDate1
      }else {
        FD[key ]={value}
      }
      
    })
    return FD;
  }

  updateDemande(){
    const formData ={
      dateDemandes:moment(this.newDemandeForm.value['dateDemandes']).format('YYYY-MM-DD'),
      obligation:this.newDemandeForm.value['obligation'],
      description:this.newDemandeForm.value['description'],
      type:this.newDemandeForm.value['type'],
      voiture:{idVoiture:this.newDemandeForm.value['voiture']},
      chauffeur:{idConducteur:this.newDemandeForm.value['chauffeur']}
    }
    this.spinner.show()
    this.service.updateDemandeEntretien(this.data.idDemandeEntretien,formData).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.spinner.hide()
        this.dialog.close(true)
      }
    },error => {
      this.toaster.error(error.error.message)
    })
  }

  createdemande(){
    const formData ={
      dateDemandes:moment(this.newDemandeForm.value['dateDemandes']).format('YYYY-MM-DD'),
      obligation:this.newDemandeForm.value['obligation'],
      description:this.newDemandeForm.value['description'],
      type:this.newDemandeForm.value['type'],
      voiture:{idVoiture:this.newDemandeForm.value['voiture']},
      chauffeur:{idConducteur:this.newDemandeForm.value['chauffeur']}


    }
    this.spinner.show()
    this.service.addDemandeEntretien(formData).subscribe((res:any) => {
      if(res){
        this.spinner.hide()
        this.dialog.close(true)
      }
    },error => {
  this.toaster.error(error.error.message)
})
  }

}
