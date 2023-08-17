import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntretienService } from '../../services/entretien.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FournisseurService } from '../../../manage-fournisseur/services/fournisseur.service';

@Component({
  selector: 'app-list-entretien',
  templateUrl: './list-entretien.component.html',
  styleUrls: ['./list-entretien.component.scss']
})
export class ListEntretienComponent implements OnInit,OnDestroy  {
  displayedColumns: string[] = ['idDemandeEntretien' ,'description','obligation','type','voiture','chauff', 'dateDemandes','actions'];
  dataSource :any
  private subscriptions: Subscription[] = [];
  public isButtonDisabled = false;
  public isInputDisabled=false;
  fournisseur:any
  data:any
  num:number=0
  fournisseurForm!:FormGroup
  constructor(public dialog: MatDialog ,private fService:FournisseurService,private dataservice:AdminDataService,private fb:FormBuilder,private service:EntretienService,private spinner: NgxSpinnerService) { }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.loadDemandeEntretienData()
    this.createForm()
    this.loadFournisseurData()
    
  }

  loadFournisseurData(){
    this.dataservice.fournisseurData$.subscribe(data=>{
      this.fournisseur=data
      if(data==null){
        this.spinner.show()
        this.fService.getFournisseur().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
          this.dataservice.setFournisseurData(res);
            this.fournisseur=res
          }
          this.spinner.hide()
        })
      }else{
        this.fournisseur=data
      }
    })
  }
  createForm() {
    this.fournisseurForm=this.fb.group({
      fournisseur:[this.data?.idFournisseur ||'' , [Validators.required ]],
    })
    
    
  }

  deleteDemende(item:any){
    this.spinner.show()
    this.service.deleteDemandeEntretien(item.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      if(res==null){
        this.spinner.hide()
        this.loadAfterUpdate()
      }
    })
  }

  loadDemandeEntretienData(){
      this.dataservice.notAprovedDemandeEntretienData$.pipe(take(1)).subscribe(res=>{
        if(res==null){
        this.spinner.show()
        this.service.getDemandeEntretienNotAprovedYet().pipe(take(1)).subscribe((response:any)=>{
          if(JSON.stringify(response)!==JSON.stringify(res)){
          this.dataservice.setNotAprovedDemandeEntretienData(response);
            this.dataSource=response
            //console.log(data)
          }
          this.spinner.hide()
        })
      }else{this.dataSource=res;}
      }) ;
  }

  seeDetails(i:any){
    this.service.setData(this.dataSource[i]);
    this.service.setData1(this.fournisseur)
  }

  cancelDemande(item:any){
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.spinner.show()
    this.service.cancelDemandeEntretienAdmin(item.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      console.log(res)
      this.isButtonDisabled=false;
    })
    this.spinner.hide();
    this.loadAfterUpdate()
    
  }

  loadAfterUpdate(){
    this.spinner.show()
    this.service.getDemandeEntretienNotAprovedYet().pipe(take(1)).subscribe((response:any)=>{
      this.dataservice.setNotAprovedDemandeEntretienData(response);
        this.dataSource=response
    })
    this.spinner.hide()
  }
  startDemande(item:any){
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.spinner.show()
    this.service.validateFirstValidation(item.idDemandeEntretien,this.fournisseurForm.value['fournisseur']).pipe(take(1)).subscribe((res:any)=>{
      console.log(res)
      this.isButtonDisabled = false;
      this.spinner.hide()
      this.loadAfterUpdate()
    })
   
    
  }
  validateDemande(item:any){
    if (this.isButtonDisabled) {
      return;
    }
    
    this.spinner.show()
    this.isButtonDisabled = true;
    this.service.validateDemande(item.idDemandeEntretien).subscribe((res:any)=>{
      console.log(res)
      this.isButtonDisabled=false;
    })
    this.spinner.hide()
    this.loadAfterUpdate()
    

  }



  getAllEntretienNotAproved(){
    this.service.getDemandeEntretienNotAprovedYet().subscribe((res:any)=>{
      this.dataservice.setNotAprovedDemandeEntretienData(res)
      console.log(res)
    })
  }
}
