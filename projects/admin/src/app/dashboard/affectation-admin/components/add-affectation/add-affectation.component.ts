import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffectationServiceService } from '../../services/affectation-service.service';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.scss']
})
export class AddAffectationComponent implements OnInit {
  newAffectationform!:FormGroup
  formValues:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb:FormBuilder ,
   public dialog: MatDialogRef<AddAffectationComponent>,
    public matDialog:MatDialog,
    private toastr: ToastrService ,
    private spinner:NgxSpinnerService,
    private dataService:AdminDataService,
    private service:AffectationServiceService) { }
  voiture:any []=[]
  chauffeur:any []=[]
  
  carButton=false
  driverButton=false
  

  ngOnInit(): void {
    console.log(this.data)
    this.createForm()
    this.loadNotAffectedChauffeur()
    this.loadNotAffectedVoitures()
    //this.getAllVoiture()
    //this.getAllChauffeur()
  }
  driverButton1(){
    this.driverButton=!this.driverButton;
  }
  carButton1(){
    this.carButton=!this.carButton
  }

  loadNotAffectedChauffeur(){
    this.dataService.notAffectedChauffeurData$.subscribe(data=>{
      
      if(data==null){
        this.spinner.show()
        this.service.getNotAffectedChauffeur().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            console.log(this.chauffeur)
            this.dataService.setNotAffectedChauffeurData(res);
              this.chauffeur=res;
            
          }
          this.spinner.hide()
        })
      }else{
        this.chauffeur=data
       
      }
    })
  }
  loadNotAffectedVoitures(){
    this.dataService.notAffectedVoitureData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getNotAffectedVoiture().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataService.setNotAffectedVoitureData(res);
              this.voiture=res
            
          }
          this.spinner.hide()
        })
      }else{
        this.voiture=data
      }
    })
  }

  updateAffectation(){
    const formData = {
      //idAffectation: this.newAffectationform.value['idAffectation'],
      dateDebut: this.newAffectationform.value['dateDebut'],
      dateFin: this.newAffectationform.value['dateFin'],
      voiture: {idVoiture: this.newAffectationform.value['voiture']},
      chauffeur: {idConducteur: this.newAffectationform.value['chauffeur']}
    };
    console.log(formData)
    this.service.updateAffectation(this.data.idAffectation,formData).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.dialog.close(true)
      }
    })
  }
  

  createForm() {
    this.newAffectationform=this.fb.group({
      dateDebut:[this.data?.dateDebut ||'' , [Validators.required ]],
      dateFin:[this.data?.dateFin ||'' , [Validators.required ]],
      voiture:[this.data?.idVoiture ||'' , [Validators.required ]],
      chauffeur:[this.data?.idChauffeur ||'' , [Validators.required ]],
    //  idAffectation:[this.data?.idAffectation ||'' , [Validators.required ]]
    })
    this.formValues =this.newAffectationform.value
    
  }
  createaffectation(){
    
    console.log(this.newAffectationform)
const formData = {
  //idAffectation: this.newAffectationform.value['idAffectation'],
  dateDebut: this.newAffectationform.value['dateDebut'],
  dateFin: this.newAffectationform.value['dateFin'],
  voiture: {idVoiture: this.newAffectationform.value['voiture']},
  chauffeur: {idConducteur: this.newAffectationform.value['chauffeur']}
};
this.service.addAffectation( formData).pipe(take(1)).subscribe(data=> {
  this.dialog.close(true)
},error => {
  this.toastr.error(error.error.message)
}) 
}







/**getAllVoiture(){
  if("NotVoiture" in localStorage){
    this.voiture=JSON.parse(localStorage.getItem("NotVoiture")!)
    console.log(this.voiture)
  }
  this.service.getNotAffectedVoiture().subscribe((res:any)=>{
    let myStorage=window.localStorage;
    myStorage.setItem("NotVoiture",JSON.stringify(res))
    this.voiture=JSON.parse(localStorage.getItem("NotVoiture")!)
  })

}


getAllChauffeur(){
  if("chauffeurs" in localStorage){
    this.chauffeur=JSON.parse(localStorage.getItem("chauffeurs")!)
    console.log(this.chauffeur)


  }
}*/
//createTask() {
  //const formData = {
    //dateDebut: this.newAffectationform.value['dateDebut'],
    //dateFin: this.newAffectationform.value['dateFin'],
    //voiture: {idVoiture: this.newAffectationform.value['voiture']['idVoiture']},
    //chauffeur: {idConducteur: this.newAffectationform.value['chauffeur']['idConducteur']}
  //};
  //console.log(formData);
  //this.service.addAffectation(formData).subscribe(data=> console.log(data));
//}




}
