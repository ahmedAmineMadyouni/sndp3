import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { DeclarationService } from '../../services/declaration.service';
import { AddAccidentComponent } from '../add-accident/add-accident.component';
import { forkJoin, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-accident',
  templateUrl: './list-accident.component.html',
  styleUrls: ['./list-accident.component.scss']
})
export class ListAccidentComponent implements OnInit  {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator; // ViewChild for MatPaginator

  displayedColumns: string[] = ['idAccident', 'numConstat1', 'numConstat2' ,'detail','type','lieu','photo','chauffeur','voiture', 'dateAcident','actions'];
  dataSource :any;
  accidentButton=false
  constructor( private dialog: MatDialog,
    private spinner: NgxSpinnerService ,
    private toastr:ToastrService,
    private dataservice: AdminDataService,
    private service:DeclarationService
    ){}

    ngOnInit(){
      
    this.loadAccidentData()
    }
    updateAccident(element:any){
      if(element!==null){
      const dialogRef=this.dialog.open(AddAccidentComponent,{
        width: '655px',
        height: '700px',
           //disableClose: true
           data:element
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        if(result==true) {
          this.loadAfterUpdateAccident()
        }
      })
    }else{
      this.toastr.warning("tu peux pas supprimer cette entity")
    }
    }

    loadAfterUpdateAccident(){
      this.spinner.show()
      this.service.getAllAccident().pipe(take(1)).subscribe((res:any)=>{
        this.dataservice.setAccidentData(res);
        this.dataSource=new MatTableDataSource(res);
        if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator = this.paginator;}else{}
      this.spinner.hide()
      })
    }

    deleteAccident(element:any){

      this.spinner.show()
    const x$=this.service.checkVoitureStillThere(element.voiture.idVoiture);
    const y$=this.service.checkChauffeurStillThere(element.chauffeur.idConducteur);
    forkJoin([
      x$,
      y$
    ]).pipe(take(2)).subscribe((res:any)=>{
      if (res[0]==true||res[1]==true) {
        this.spinner.hide()
        this.accidentButton=!this.accidentButton
        this.toastr.warning("warning","you can not delete accident that have a driver having his existing status ="+res[1]+" and a car  that have a existing status = "+res[0]+"  you have to delete car and driver first ")      
      } else {
        this.service.deleteAccident(element.idAccident).pipe(take(1)).subscribe((res:any)=>{
      
          this.loadAfterUpdateAccident()
          this.toastr.success("success","you have deleted  accident with description : "+element.detail)      
        this.accidentButton=!this.accidentButton
        this.spinner.hide()
      })
        
      }
    })







    }

    loadAccidentData(){
      this.dataservice.accidentData$.pipe(take(1)).subscribe(data=>{
        if(data==null){
          this.spinner.show()
          this.service.getAllAccident().pipe(take(1)).subscribe((res:any)=>{
            if(JSON.stringify(res)!==JSON.stringify(data)){
              this.dataservice.setAccidentData(res);
              this.dataSource= new MatTableDataSource(res);
              if(this.dataSource.paginator==null||this.paginator!=null){ console.log("sayee"); this.dataSource.paginator=this.paginator;}else{}
              this.spinner.hide()
            }
          })
        }else{
          this.dataSource=new MatTableDataSource(data);
          if(this.dataSource.paginator==null&&this.paginator!=null){console.log("sayee");  this.dataSource.paginator=this.paginator;}else{}
        }
      })
    }



}
