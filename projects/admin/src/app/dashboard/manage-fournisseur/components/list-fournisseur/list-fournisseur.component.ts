import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FournisseurService } from '../../services/fournisseur.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { AddFournisseurComponent } from '../add-fournisseur/add-fournisseur.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator



  displayedColumns:String[]=['idFournisseur','nomSociete','numTel','adresse1','ville','actions']
  dataSource:any
  constructor(private dialog: MatDialog,
    private spinner: NgxSpinnerService,
     private dataservice:AdminDataService,
     private fb:FormBuilder,
     private toaster:ToastrService,
     private service:FournisseurService) { }

  ngOnInit(): void {
    this.loadFournisseurData()
    //this.getFournisseurs()
  }
  updateFournisseur(element:any){
    const dialogRef = this.dialog.open(AddFournisseurComponent,{
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
  deleteFournisseur(element:any){
    this.spinner.show()
    this.service.checkFournisseur(element.idFournisseur).subscribe((res:any)=>{
      if(res==false){
        this.service.deleteFournisseur(element.idFournisseur).subscribe((res:any)=>{
          this.loadAfterUpdate()
          this.spinner.hide()
          this.toaster.success("Success","YOU Habe Deleted Fournisseur With Name Of Society:  "+element.nomSociete)
        })
      }else{
        this.spinner.hide()
        this.toaster.warning("WARNING","You Can Not Delete IN PROGRESS Demande Etretien with this "+ element.nomSociete + "Fournisseur ")
      }
    })
  }
  loadAfterUpdate(){
    this.spinner.show()
    this.service.getFournisseur().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setFournisseurData(res);
            this.dataSource=new MatTableDataSource(res)
            if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
            this.spinner.hide()
        
    })
  }
  loadFournisseurData(){
    this.dataservice.fournisseurData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getFournisseur().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setFournisseurData(res);
            this.dataSource=new MatTableDataSource(res)
            if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
          }
            this.spinner.hide()
        })
      }else{
        this.dataSource=new MatTableDataSource(data)
      if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
      }
    })
  }
  
  

  

  addFournisseur(){

    const dialogRef = this.dialog.open(AddFournisseurComponent,{
      width:'750px',
      height: '700px',
      //disableClose: true
    });
    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res==true){
      this.loadAfterUpdate();}

    })
  }




















  getFournisseurs(){
    if("fournisseur"in localStorage){
      this.dataSource=new MatTableDataSource(JSON.parse(localStorage.getItem("fournsseur")!));
      console.log(this.dataSource)
    }
    this.service.getFournisseur().subscribe((res:any)=>{
      console.log(res)
      let myStorage=window.localStorage;
      
        myStorage.setItem("fournisseur",JSON.stringify(res))
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem("fournisseur")!));
      this.dataSource.paginator = this.paginator;}
//todo na7i el ecrassement de local storage
     // console.log(JSON.parse(localStorage.getItem("voiture")!));
    , error=> {

    })

  }

}
