import { Component, OnInit } from '@angular/core';
import { EntretienService } from '../../services/entretien.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-entretien-details',
  templateUrl: './entretien-details.component.html',
  styleUrls: ['./entretien-details.component.scss']
})
export class EntretienDetailsComponent implements OnInit {
data:any
fournisseur:any
fournisseurForm!:FormGroup
aprovedStatus=false
public isButtonDisabled = false;
public isInputDisabled=false;
completed!:boolean 
  constructor(private dataService:EntretienService ,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private service:EntretienService,
    private dataservice:AdminDataService,
     private spinner: NgxSpinnerService ,
    private location: Location) { }
  ngOnInit(): void {
    this.createForm()
this.load()
  }

  load(){
    this.spinner.show()
    this.dataService.data$.subscribe(data => {
      this.data = data;
      if(data.completed=="SUCCESS"){
        this.completed=true
      }
      if(data.completed=="CANCELED"){
        this.completed=false
      }
      if(data.completed==null){
        this.aprovedStatus=true
      }
    });
    this.dataService.data1$.pipe(take(1)).subscribe(data1=>{
      this.fournisseur=data1
      this.spinner.hide()
    })
  }
  createForm(){
    this.fournisseurForm=this.fb.group({
      fournisseur:[this.data?.idFournisseur ||'' , [Validators.required ]],
    })
  }
startDemande(element:any){
  this.spinner.show()
    this.service.validateFirstValidation(element.idDemandeEntretien,this.fournisseurForm.value['fournisseur']).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.isButtonDisabled = false;
        this.loadAfterUpdate()
        this.goBack();
        
        this.toastr.success("success","you have validated  Demande Entretien  "+element.type+"  successfully")
         this.spinner.hide()
      }
      
    })

}

  cancelDemande(element:any){
    this.spinner.show()
    this.service.cancelDemandeEntretienAdmin(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.loadAfterUpdate()
        this.goBack();
        this.toastr.success("success","you have canceled Demande Entretien  "+element.type+"  successfully")
         this.spinner.hide()
      }
    })
  }

  deleteDemande(element:any){
    this.spinner.show()
    this.service.deleteEntretien(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.loadAfterUpdate()
        this.goBack();
        this.toastr.success("success","you have deleted Demande Entretien  "+element.type+"  successfully")
         this.spinner.hide()
      }
    })
  }
  loadAfterUpdate(){
    this.spinner.show()
    this.service.getDemandeEntretienNotAprovedYet().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setNotAprovedDemandeEntretienData(res);
      this.spinner.hide()
    })
  }

  
  goBack(): void {

    this.location.back();
  }

}
