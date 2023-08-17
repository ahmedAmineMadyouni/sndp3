import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ChauffeurService } from '../../service/chauffeur.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AddChauffeurComponent } from '../add-chauffeur/add-chauffeur.component';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-chauffuer',
  templateUrl: './list-chauffuer.component.html',
  styleUrls: ['./list-chauffuer.component.scss']
})
export class ListChauffuerComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator

  displayedColumns: string[] = ['id-conducteur','nom', 'prenom', 'email' ,'numCIN', 'numCNSS','numTelephone','actions'];
  dataSource:any
  chauffeurs:any
  constructor(private dialog: MatDialog ,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private dataservice:AdminDataService,
    private fb:FormBuilder,
    private service:ChauffeurService) { }

  ngOnInit(): void {
   this.loadChauffeurData()
   // this.getChauffeur()
  }

  loadAfterUpdate(){
    this.spinner.show()
    this.service.getChauffuer().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setChauffeurData(res);
        this.dataSource=new MatTableDataSource(res);
        if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
        this.spinner.hide()    
      })
      
  }
  updateChauffeur(element:any){
    const dialogRef = this.dialog.open(AddChauffeurComponent,{
      width:'750px',
      height: '700px',
      //disableClose: true
      data:element,
    });
    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res==true){
        
      this.loadAfterUpdate();}

    })
  }
  deleteChauffeur(element:any){
    this.spinner.show()
    this.service.checkChauffeur(element.idConducteur).subscribe((res:any)=>{
      if(res==true){
        this.toastr.warning("warning","you can not delete a chauffeur that have a inprores demandeEntretien or that exists in a still not sucess or canceled mission ")
      }else{
        this.service.deleteChauffeur(element.idConducteur).subscribe((res:any)=>{
          if(res){
            this.loadAfterUpdate()
            this.toastr.success("success","you have deleted chauffeur with name :  "+element.nom+"  successfully")
            this.spinner.hide()
          }
        })
      }
    })

  }
  loadChauffeurData(){
    this.spinner.show()
    this.dataservice.chauffeurData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
       this.service.getChauffuer().subscribe((res:any)=>{
        if(JSON.stringify(res)!==JSON.stringify(data)){
          this.dataservice.setChauffeurData(res);
            this.dataSource=new MatTableDataSource(res);
            if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
            }
            this.spinner.hide()
          })
          }else{
            this.dataSource=new MatTableDataSource(data);
            if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
            this.spinner.hide()
          }
      })
    }


  getChauffeur(){
    this.service.getChauffuer().subscribe((res:any)=>{ 
      let myStorage=window.localStorage;
      myStorage.setItem("chauffeurs",JSON.stringify(res))
      this.dataSource = new MatTableDataSource(JSON.parse(myStorage.getItem('chauffeurs')!));
      this.dataSource.paginator = this.paginator;})
  }

  addChauffeur(){
    const dialogRef = this.dialog.open(AddChauffeurComponent,{
      width:'750px',
      height: '700px',
      //disableClose: true
    });
    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res==true){
        this.loadAfterUpdate();
      }
    })

  }
}
