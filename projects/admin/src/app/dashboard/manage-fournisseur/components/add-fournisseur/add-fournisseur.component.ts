import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FournisseurService } from '../../services/fournisseur.service';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {

  newFournisseurForm!:FormGroup
  //adresseForm!:FormGroup
  formValues:any
  
  //data1: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder ,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    public dialog: MatDialogRef<AddFournisseurComponent>,
    public matDialog:MatDialog,
    
    private service:FournisseurService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
    
  }


  createForm() {
    this.newFournisseurForm=this.fb.group({
      nomSociete:[this.data?.nomSociete ||'' , [Validators.required ]],
      numTel:[this.data?.numTel ||'' , [Validators.required ]],
      adresse:this.fb.group({
        adresse1:[this.data?.adresse?.adresse1 ||'',[Validators.required]],
        adresse2:[this.data?.adresse?.adresse2 ||'',[Validators.required]],
        codePostal:[this.data?.adresse?.codePostal ||'',[Validators.required]],
        ville:[this.data?.adresse?.ville ||'',[Validators.required]],
        pays:[this.data?.adresse?.pays ||'',[Validators.required]]
      })
      
    })
    this.formValues =this.newFournisseurForm.value
    
  }

  createform2(){
    }

    updateFournisseur(){
      this.spinner.show()
      const formData = {
        nomSociete: this.newFournisseurForm.value['nomSociete'],
        numTel: this.newFournisseurForm.value['numTel'],
        adresse: this.newFournisseurForm.value['adresse'],
      };
      this.service.updateFournisseur(this.data.idFournisseur,formData).pipe(take(1)).subscribe((res:any)=>{
        this.spinner.hide()
        this.dialog.close(true)
      },error => {
        this.toastr.error(error.error.message)
      }) 
      }

  createFournisseur(){
    this.spinner.show()
    const formData = {
      //idAffectation: this.newAffectationform.value['idAffectation'],
      nomSociete: this.newFournisseurForm.value['nomSociete'],
      numTel: this.newFournisseurForm.value['numTel'],
      adresse: this.newFournisseurForm.value['adresse'],
    };
    console.log(formData)
    
    this.service.addFournisseur( formData).subscribe(data=> {
      this.spinner.hide()
      this.dialog.close(true)
    },error => {
      this.toastr.error(error.error.message)
    }) 
    }

}
