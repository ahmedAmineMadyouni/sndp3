import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeclarationService } from '../../services/declaration.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-declaration-amendes',
  templateUrl: './add-declaration-amendes.component.html',
  styleUrls: ['./add-declaration-amendes.component.scss']
})
export class AddDeclarationAmendesComponent implements OnInit {

  fileName = ""
  newAmendentForm!:FormGroup
  formValues:any
  constructor(private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddDeclarationAmendesComponent>,
    public matDialog:MatDialog,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private service:DeclarationService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
  }
  updateDecAmendes(){
    let formData :any
    formData=this.prepareFormData()
    this.spinner.show()
    this.service.updatedeclarationAmendes(this.data.idDeclarationAmendes,formData).pipe(take(1)).subscribe((res:any)=>{
     
        this.spinner.hide()
        this.dialog.close(true)
      
    })


  }
  selectImage(event:any) {
    this.fileName = event.target.value
    this.newAmendentForm.get('file')?.setValue(event.target.files[0])
  }


  createForm() {
    const idConducteur = JSON.parse(localStorage.getItem('token')!).idConducteur;
  const idVoiture = JSON.parse(localStorage.getItem('token')!).idVoiture;
    this.newAmendentForm=this.fb.group({
      numAmendes:[this.data?.numAmendes ||'' , [Validators.required ]],
      montant:[this.data?.montant ||'' , [Validators.required ]],
      detail:[this.data?.detail ||'' , [Validators.required ]],
      type:[this.data?.type ||'' , [Validators.required ]],
      lieu:[this.data?.lieu ||'' , [Validators.required]],
      datedeclaration:[this.data?.datedeclaration ||'' , [Validators.required ]],
      dateAmendes:[this.data?.dateAmendes ||'' , [Validators.required ]],
      voiture:[{value: idVoiture, disabled: true} , [Validators.required ]],
      chauffeur:[{value: idConducteur, disabled: true} , [Validators.required ]],
      file : [this.data? this.fileName=this.data?.photoName : '' , Validators.required]
    });
    this.newAmendentForm.get('chauffeur')?.enable()
    this.newAmendentForm.get('voiture')?.enable()

    this.formValues =this.newAmendentForm.value
  }
  prepareFormData(){
    let newDate=moment(this.newAmendentForm.value['datedeclaration']).format('YYYY-MM-DD');
    let newDate1=moment(this.newAmendentForm.value['dateAmendes']).format('YYYY-MM-DD')
    let FD =new FormData()
    Object.entries(this.newAmendentForm.value).forEach(([key,value]:any) => {
      if(key=='datedeclaration'){
        FD.append(key,newDate)
      }if (key=='dateAmendes') {
        FD.append(key,newDate1)
      } else {
        FD.append(key,value)
      }
      
    })
    
    return FD;
  }

  createdeclaration(){
    let formData 
    formData=this.prepareFormData()
    this.spinner.show()
    this.service.addDeclarationAmendes(formData).subscribe(data=> {
      this.dialog.close(true)
      this.spinner.hide()
    },error => {
      this.toastr.error(error.error.message)
    }) 
  }
}
