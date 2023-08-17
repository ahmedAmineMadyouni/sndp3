import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EntretienService } from '../../services/entretien.service';
import * as moment from 'moment';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-entretien',
  templateUrl: './add-entretien.component.html',
  styleUrls: ['./add-entretien.component.scss']
})
export class AddEntretienComponent implements OnInit {
  newDemandeForm!:FormGroup
  formValues:any
  constructor(private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner:NgxSpinnerService,
    public dialog: MatDialogRef<AddEntretienComponent>,
    public matDialog:MatDialog,
    private toaster:ToastrService,
    private service:EntretienService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
  }
  createForm(){
    const idConducteur = JSON.parse(this.data.chauffeurPhotoId);
  const idVoiture = JSON.parse(this.data.voiturePhotoId);
  const idFournisseur:number=JSON.parse(this.data.fournisseur?.idFournisseur)

    this.newDemandeForm=this.fb.group({
      libellee:[this.data?.libellee ||'' , [Validators.required ]],
      detail:[this.data?.detail ||'' , [Validators.required ]],
      numDemandeAchat:[this.data.numDemandeAchat||'' ,[Validators.required]],
      dateE:[this.data.dateE||'' ,[Validators.required]],
      montant:[this.data.montant||'' ,[Validators.required]],
      type:[this.data?.type ||'' , [Validators.required ]],
      fournisseur:[{value: idFournisseur, disable: true} , [Validators.required]],
      voiture:[{value: idVoiture, disabled: true} , [Validators.required ]],
      chauffeur:[{value: idConducteur, disabled: true} , [Validators.required ]],
    });
    this.newDemandeForm.get('chauffeur')?.enable()
    this.newDemandeForm.get('voiture')?.enable()
    this.newDemandeForm.get('fournisseur')?.enable()

    this.formValues =this.newDemandeForm.value
  }


  updateEntretien(){
    this.spinner.show()
    const formData ={
      dateE:moment(this.newDemandeForm.value['dateE']).format('YYYY-MM-DD'),
      libellee:this.newDemandeForm.value['libellee'],
      detail:this.newDemandeForm.value['detail'],
      type:this.newDemandeForm.value['type'],
      numDemandeAchat:this.newDemandeForm.value['numDemandeAchat'],
      montant:this.newDemandeForm.value['montant'],
      voiture:{idVoiture:this.newDemandeForm.value['voiture']},
      chauffeur:{idConducteur:this.newDemandeForm.value['chauffeur']},
      fournisseur:{idFournisseur:this.newDemandeForm.value['fournisseur']}
    }
    
    this.service.updateEntretien(this.data.IdEntretien,formData).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.spinner.hide()
        this.dialog.close(true)
      }
    },error => {
      this.toaster.error(error.error.message)
    })
  }

}
