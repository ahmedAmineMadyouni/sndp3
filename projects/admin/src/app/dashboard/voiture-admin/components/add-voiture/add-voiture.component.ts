import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VoitureService } from '../../services/voiture.service';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.scss']
})
export class AddVoitureComponent implements OnInit {
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
     public matDialog:MatDialog ,
     public dialog: MatDialogRef<AddVoitureComponent>,
      private service :VoitureService) { }

  fileName=""
  newVoitureForm!:FormGroup
  formValues:any
  ngOnInit(): void {

    this.createForm()
  }
  selectImage(event:any) {
    this.fileName = event.target.value
    this.newVoitureForm.get('file')?.setValue(event.target.files[0])
  }
   
  updateVoiture(){
    this.spinner.show()
    let formData = new FormData()
formData.append('MatriculeV' , this.newVoitureForm.value['MatriculeV'])
formData.append('CarteGrise' , this.newVoitureForm.value['CarteGrise'])
formData.append('file' , this.newVoitureForm.value['file'])
formData.append('dateAssurance' , this.newVoitureForm.value['dateAssurance'])
formData.append('dateCirculation' , this.newVoitureForm.value['dateCirculation'])
formData.append('dateFinVisite' , this.newVoitureForm.value['dateFinVisite'])
formData.append('libelleMarque' , this.newVoitureForm.value['libelleMarque'])
formData.append('libellemodele' , this.newVoitureForm.value['libellemodele'])
formData.append('nbrCylindre' , this.newVoitureForm.value['nbrCylindre'])
formData.append('type' , this.newVoitureForm.value['type'])
    this.service.updateVoiture(this.data.idVoiture,formData).pipe(take(1)).subscribe((res:any)=>{
      this.spinner.hide()
  this.dialog.close(true)
},error => {
  this.toastr.error(error.error.message)
}) 
}

  createForm() {
    this.newVoitureForm = this.fb.group({
      MatriculeV : [this.data?.matriculeV || '' , [Validators.required , Validators.minLength(5)]],
      CarteGrise : [this.data?.carteGrise || '' , Validators.required],
      file : [this.data? this.fileName= this.data?.photo.name : '' , Validators.required],
      dateAssurance: [ this.data ?.dateAssurance || '' , Validators.required],
      dateCirculation: [ this.data ?.dateCirculation || '' , Validators.required],
      dateFinVisite: [ this.data ?.dateFinVisite || '' , Validators.required],
      libelleMarque: [ this.data ?.libelleMarque || '' , Validators.required],
      libellemodele: [ this.data ?.libellemodele || '' , Validators.required],
      nbrCylindre: [ this.data ?.nbrCylindre || '' , Validators.required],
      type: [ this.data ?.type || '' , Validators.required]
    })

    this.formValues = this.newVoitureForm.value
  }
  createVoiture(){
    this.spinner.show()
    let formData = new FormData()
formData.append('MatriculeV' , this.newVoitureForm.value['MatriculeV'])
formData.append('CarteGrise' , this.newVoitureForm.value['CarteGrise'])
formData.append('file' , this.newVoitureForm.value['file'])
formData.append('dateAssurance' , this.newVoitureForm.value['dateAssurance'])
formData.append('dateCirculation' , this.newVoitureForm.value['dateCirculation'])
formData.append('dateFinVisite' , this.newVoitureForm.value['dateFinVisite'])
formData.append('libelleMarque' , this.newVoitureForm.value['libelleMarque'])
formData.append('libellemodele' , this.newVoitureForm.value['libellemodele'])
formData.append('nbrCylindre' , this.newVoitureForm.value['nbrCylindre'])
formData.append('type' , this.newVoitureForm.value['type'])
this.service.createCar(formData).pipe(take(1)).subscribe(data=> {
  this.spinner.hide()
  this.dialog.close(true)
},error => {
  this.toastr.error(error.error.message)
}) 
}
}