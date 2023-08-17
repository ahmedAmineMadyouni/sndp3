import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeclarationService } from '../../services/declaration.service';
import * as moment from 'moment';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-accident',
  templateUrl: './add-accident.component.html',
  styleUrls: ['./add-accident.component.scss']
})
export class AddAccidentComponent implements OnInit {
  fileName = ""
  newAccidentForm!:FormGroup
  formValues:any
  constructor( private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddAccidentComponent>,
    public matDialog:MatDialog,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private service :DeclarationService) { }

  ngOnInit(): void {
    this.createForm()
  }

  updateAccident(){
    let formData 
    formData=this.prepareFormData()
this.spinner.show()
this.service.updateAccident(this.data.idAccident,formData).pipe(take(1)).subscribe((res:any)=>{
  this.spinner.hide()
  this.dialog.close(true)
},error => {
  this.toaster.error(error.error.message)
})
  }

  selectImage(event:any) {
    this.fileName = event.target.value
    this.newAccidentForm.get('file')?.setValue(event.target.files[0])
  }
  createForm() {
    const idConducteur = JSON.parse(this.data.idConducteur);
  const idVoiture = JSON.parse(this.data.idVoiture);
    this.newAccidentForm=this.fb.group({
      numConstat1:[this.data?.numConstat1 ||'' , [Validators.required ]],
      numConstat2:[this.data?.numConstat2 ||'' , [Validators.required ]],
      detail:[this.data?.detail ||'' , [Validators.required ]],
      type:[this.data?.type ||'' , [Validators.required ]],
      lieu:[this.data?.lieu ||'' , [Validators.required]],
     // dateDeclaration:[this.data?.dateDeclaration ||'' , [Validators.required ]],
      dateAcident:[this.data?.dateAcident ||'' , [Validators.required ]],
      voiture:[{value: idVoiture, disabled: true} , [Validators.required ]],
      chauffeur:[{value: idConducteur, disabled: true} , [Validators.required ]],
      file : [this.data? this.fileName=this.data.photoName: '' , Validators.required]
    });
    this.newAccidentForm.get('chauffeur')?.enable()
    this.newAccidentForm.get('voiture')?.enable()

    this.formValues =this.newAccidentForm.value
  }
  prepareFormData(){
    //let newDate=moment(this.newAccidentForm.value['dateDeclaration']).format('YYYY-MM-DD');
    let newDate1=moment(this.newAccidentForm.value['dateAcident']).format('YYYY-MM-DD')
    let FD =new FormData()
    Object.entries(this.newAccidentForm.value).forEach(([key,value]:any) => {
      /**if(key=='dateDeclaration'){
        FD.append(key,newDate)
      }*/if (key=='dateAcident') {
        FD.append(key,newDate1)
      } else {
        FD.append(key,value)
      }
      
    })
    return FD;
  }

}
