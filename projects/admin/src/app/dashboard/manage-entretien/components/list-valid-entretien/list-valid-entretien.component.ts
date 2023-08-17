import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EntretienService } from '../../services/entretien.service';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AddEntretienComponent } from '../add-entretien/add-entretien.component';

@Component({
  selector: 'app-list-valid-entretien',
  templateUrl: './list-valid-entretien.component.html',
  styleUrls: ['./list-valid-entretien.component.scss']
})
export class ListValidEntretienComponent implements OnInit {
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator
  displayedColumns: string[] = ['IdEntretien' ,'libellee','detail','type','NumDemandeAchat','montant','voiture','chauff','fournisseur', 'DateE','actions'];
  dataSource :any
  constructor(private toastr:ToastrService,
    private spinner:NgxSpinnerService,
     private dialog: MatDialog,
     private fb:FormBuilder,
     private service:EntretienService,
     private dataService:AdminDataService) { }

  ngOnInit(): void {
    this.loadEntretienData()
  }

  loadEntretienData(){
    this.dataService.entretienData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
        this.spinner.show()
      this.service.getAllEntretien().pipe(take(1)).subscribe((res:any)=>{
        if(JSON.stringify(res)!== JSON.stringify(data)){
          this.dataService.setEntretienData(res);
          this.dataSource=new MatTableDataSource(res)
          if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
        }
        this.spinner.hide()
      })
    }else{ this.dataSource= new MatTableDataSource(data)
      if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}}
    })
  }

  updateEntretien(element:any){
    if(element!==null){
    const dialogRef = this.dialog.open(AddEntretienComponent,{
      width: '755px',
      height: '750px',
         //disableClose: true
         data:element
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==true) {
        this.loadAfterUpdate()
      }
    })
  }
  }
  loadAfterUpdate(){
    this.spinner.show()
    this.service.getAllEntretien().pipe(take(1)).subscribe((res:any)=>{
      this.dataService.setEntretienData(res);
      this.dataSource=new MatTableDataSource(res)
      if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
      this.spinner.hide()
    })
  }

  deleteEntretien(element:any){
    this.spinner.show()
    this.service.chechVoitureStillThere(element.voiture.idVoiture).pipe(take(1)).subscribe((res:any)=>{
      if(res==true){
        this.spinner.hide()
        this.toastr.warning("you can not delete entretien with an still exists in the parc car  ")
      }else{
        this.service.deleteEntretien(element.IdEntretien).pipe(take(1)).subscribe((res:any)=>{
          this.toastr.success("success","you have deleted entretien with id :"+element.IdEntretien+" successfuly")
          this.spinner.hide()
          this.loadAfterUpdate()
        })
     
      }
    })
     
  }




}

