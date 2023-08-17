import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { DeclarationService } from '../../services/declaration.service';
import { AddAmendesComponent } from '../add-amendes/add-amendes.component';
import { forkJoin, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-amendes',
  templateUrl: './list-amendes.component.html',
  styleUrls: ['./list-amendes.component.scss']
})
export class ListAmendesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  displayedColumns2: string[] = ['idAmendes', 'numAmendes', 'detail','type' ,'lieu','montant', 'chauffeur','voiture','dateAmendes','photo','actions'];
  dataSource2 :any;
  amendesButton=false
  constructor( private dialog: MatDialog,
    private spinner: NgxSpinnerService ,
    private toastr:ToastrService,
    private dataservice: AdminDataService,
    private service:DeclarationService
    ){}
  ngOnInit(): void {
    this.loadAmendesData();
  }

  updateAmendes(element:any){
    if(element!==null){
    const dialogRef = this.dialog.open(AddAmendesComponent,{
      width: '655px',
      height: '700px',
         //disableClose: true
         data:element
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==true) {
        this.loadAfterUpdateAmendes()
      }
    })
  }else{
    this.toastr.warning("tu peux pas supprimer cette entity")
  }
  }

  loadAfterUpdateAmendes(){
    this.spinner.show()
    this.service.getAllAmendes().pipe(take(1)).subscribe((res:any)=>{
      this.dataSource2 = new MatTableDataSource(res);
      if(this.dataSource2.paginator==null&&this.paginator!=null){this.dataSource2.paginator = this.paginator;}else{}
    this.spinner.hide()
    })
  }

  deleteAmendes(element:any){
    this.spinner.show()
    const x$=this.service.checkVoitureStillThere(element.voiture.idVoiture);
    const y$=this.service.checkChauffeurStillThere(element.chauffeur.idConducteur);
    forkJoin([
      x$,
      y$
    ]).pipe(take(2)).subscribe((res:any)=>{
      if (res[0]==true||res[1]==true) {
        this.spinner.hide()
        this.amendesButton=!this.amendesButton
        this.toastr.warning("warning","you can not delete amendes that have a driver having his existing status ="+res[1]+" and a car  that have a existing status = "+res[0]+"  you have to delete car and driver first ")      
      } else {
        this.service.deleteAmendes(element.idAmendes).pipe(take(1)).subscribe((res:any)=>{
      
          this.loadAfterUpdateAmendes()
          this.toastr.success("success","you have deleted  amendes with description : "+element.detail)      
        this.amendesButton=!this.amendesButton
        this.spinner.hide()
      })
        
      }
    })
    
  }

  loadAmendesData(){
    this.dataservice.amendesData$.pipe(take(2)).subscribe(data=>{
      if(data==null){
        this.spinner.show();
        this.service.getAllAmendes().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setAmendesData(res);
            this.dataSource2=new MatTableDataSource(res);   
            if(this.dataSource2.paginator==null&&this.paginator!=null){this.dataSource2.paginator = this.paginator;}else{}
          }
          this.spinner.hide()
        })
      }else{
        
      this.dataSource2=new MatTableDataSource(data);
      
      if(this.dataSource2.paginator==null&&this.paginator!=null){this.dataSource2.paginator = this.paginator;}else{}
      }
    })
  

  }

}
