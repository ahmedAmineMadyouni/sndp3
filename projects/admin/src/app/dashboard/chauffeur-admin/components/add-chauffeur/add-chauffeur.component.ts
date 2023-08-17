import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChauffeurService } from '../../service/chauffeur.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-chauffeur',
  templateUrl: './add-chauffeur.component.html',
  styleUrls: ['./add-chauffeur.component.scss']
})
export class AddChauffeurComponent implements OnInit {

  fileName = ""
  newChauffeurForm!:FormGroup
 // adresseForm!:FormGroup
  formValues:any
  showPassword: boolean = false;
 
  constructor( private fb:FormBuilder , 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<AddChauffeurComponent>,
     public matDialog:MatDialog,
     private toaster:ToastrService,
     private spinner:NgxSpinnerService,
     private service:ChauffeurService) { }

  ngOnInit(): void {
    this.createForm()
    //this.createform2()
  }
  onNoClick(): void {
    this.dialog.close();
  }

  
  selectImage(event:any) {
    this.fileName = event.target.value
    this.newChauffeurForm.get('file')?.setValue(event.target.files[0])
  }
  createForm() {
    this.newChauffeurForm=this.fb.group({
      Nom:[this.data?.nom ||'' , [Validators.required ]],
      prenom:[this.data?.prenom ||'' , [Validators.required ]],
      password:[this.data?.password ||'' , [Validators.required ]],
      confirmPassword:[this.data?.password ||'' , [Validators.required ]],
      numCIN:[this.data?.numCIN ||'' , [Validators.required ]],
      email:[this.data?.email ||'' , [Validators.required,Validators.email ]],
      numCNSS:[this.data?.numCNSS ||'' , [Validators.required ]],
      numTelephone:[this.data?.numTelephone ||'' , [Validators.required ]],
      file : [this.data? this.fileName= this.data?.photo?.name : '' , Validators.required],
      adresse:this.fb.group({
        adresse1:[this.data?.adresse?.adresse1 ||'',[Validators.required]],
        adresse2:[this.data?.adresse?.adresse2 ||'',[Validators.required]],
        codePostal:[this.data?.adresse?.codePostal ||'',[Validators.required]],
        ville:[this.data?.adresse?.ville ||'',[Validators.required]],
        pays:[this.data?.adresse?.pays ||'',[Validators.required]]
      })
    }, { validators: this.passwordMatchValidator });
    this.formValues =this.newChauffeurForm.value
    //console.log(this.newChauffeurForm.value)
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ 'passwordMismatch': true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


 
  updateChauffeur(){
    this.spinner.show()
    let formData = new FormData()
formData.append('Nom' , this.newChauffeurForm.value['Nom'])
formData.append('prenom' , this.newChauffeurForm.value['prenom'])
formData.append('file' , this.newChauffeurForm.value['file'])
formData.append('password' , this.newChauffeurForm.value['password'])
formData.append('numCIN' , this.newChauffeurForm.value['numCIN'])
formData.append('email' , this.newChauffeurForm.value['email'])
formData.append('numCNSS' , this.newChauffeurForm.value['numCNSS'])
formData.append('numTelephone' , this.newChauffeurForm.value['numTelephone'])
formData.append('adresse.adresse1', this.newChauffeurForm.value['adresse1'])
formData.append('adresse.adresse2', this.newChauffeurForm.value['adresse2'])
formData.append('adresse.codePostal', this.newChauffeurForm.value['codePostal'])
formData.append('adresse.ville', this.newChauffeurForm.value['ville'])
formData.append('adresse.pays', this.newChauffeurForm.value['pays'])
this.service.updateChauffeur(this.data.idConducteur,formData).subscribe((res:any)=>{
  this.spinner.hide()
})
this.dialog.close(true)
}

  createChauffeur(){
    this.spinner.show()
    let formData = new FormData()
formData.append('Nom' , this.newChauffeurForm.value['Nom'])
formData.append('prenom' , this.newChauffeurForm.value['prenom'])
formData.append('file' , this.newChauffeurForm.value['file'])
formData.append('password' , this.newChauffeurForm.value['password'])
formData.append('numCIN' , this.newChauffeurForm.value['numCIN'])
formData.append('email' , this.newChauffeurForm.value['email'])
formData.append('numCNSS' , this.newChauffeurForm.value['numCNSS'])
formData.append('numTelephone' , this.newChauffeurForm.value['numTelephone'])
formData.append('adresse.adresse1', this.newChauffeurForm.value['adresse1'])
formData.append('adresse.adresse2', this.newChauffeurForm.value['adresse2'])
formData.append('adresse.codePostal', this.newChauffeurForm.value['codePostal'])
formData.append('adresse.ville', this.newChauffeurForm.value['ville'])
formData.append('adresse.pays', this.newChauffeurForm.value['pays'])
//console.log(this.newChauffeurForm.value)
console.log(this.newChauffeurForm.value)

this.service.addChauffeur(formData).subscribe(data=> this.spinner.hide());
this.dialog.close(true)
}





/**createform2(){
  this.adresseForm=this.fb.group({
    adresse1:[this.data1?.adresse1 ||'',[Validators.required]],
    adresse2:[this.data1?.adresse2 ||'',[Validators.required]],
    codePostal:[this.data1?.codePostal ||'',[Validators.required]],
    ville:[this.data1?.ville ||'',[Validators.required]]
  })
  //this.formValues =this.adresseForm.value
}*/



}
