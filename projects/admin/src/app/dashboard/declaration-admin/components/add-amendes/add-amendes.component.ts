import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeclarationService } from '../../services/declaration.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-amendes',
  templateUrl: './add-amendes.component.html',
  styleUrls: ['./add-amendes.component.scss']
})
export class AddAmendesComponent implements OnInit {
  fileName = ""
  newAmendentForm!:FormGroup
  formValues:any
  constructor(private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddAmendesComponent>,
    public matDialog:MatDialog,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private service :DeclarationService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
  }

  updateAmendes(){
    let formData :any
    formData=this.prepareFormData()
    this.spinner.show()
    this.service.updateAmendes(this.data.idDeclarationAmendes,formData).pipe(take(1)).subscribe((res:any)=>{
     
        this.spinner.hide()
        this.dialog.close(true)
      
    },error => {
      this.toastr.error(error.error.message)
    })


  }
  selectImage(event:any) {
    this.fileName = event.target.value
    this.newAmendentForm.get('file')?.setValue(event.target.files[0])
  }
  createForm() {
    const idConducteur = this.data?.idConducteur;
  const idVoiture = this.data?.idVoiture;
    this.newAmendentForm=this.fb.group({
      numAmendes:[this.data?.numAmendes ||'' , [Validators.required ]],
      montant:[this.data?.montant ||'' , [Validators.required ]],
      detail:[this.data?.detail ||'' , [Validators.required ]],
      type:[this.data?.type ||'' , [Validators.required ]],
      lieu:[this.data?.lieu ||'' , [Validators.required]],
      dateAmendes:[this.data?.dateAmendes ||'' , [Validators.required ]],
      voiture:[{value: idVoiture, disabled: true} , [Validators.required ]],
      chauffeur:[{value: this.data?.idConducteur, disabled: true} , [Validators.required ]],
      file : [this.data? this.fileName=this.data?.photoName : '' , Validators.required]
    });
    this.newAmendentForm.get('chauffeur')?.enable()
    this.newAmendentForm.get('voiture')?.enable()

    this.formValues =this.newAmendentForm.value
  }
  prepareFormData(){
    let newDate1=moment(this.newAmendentForm.value['dateAmendes']).format('YYYY-MM-DD')
    let FD =new FormData()
    Object.entries(this.newAmendentForm.value).forEach(([key,value]:any) => {
      if (key=='dateAmendes') {
        FD.append(key,newDate1)
      } else {
        FD.append(key,value)
      }
      
    })
    
    return FD;
  }

}
