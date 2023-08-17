import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddAffectationComponent } from '../add-affectation/add-affectation.component';
import { MatPaginator } from '@angular/material/paginator';
import { AffectationServiceService } from '../../services/affectation-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, finalize, of, switchMap, take, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  affectName: string;
  chauff: string;
  voiture: string;
  affectDate: string;
}


@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.scss']
})

export class ListAffectationComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator

  displayedColumns: string[] = ['idAffectation', 'chauff', 'voiture' ,'deadLineDate', 'affectDate','actions'];
  data:any
  chauffeurs:any
  voitures:any

  constructor(private servicedata:AdminDataService,
    private spinner:NgxSpinnerService,
    private toastr:ToastrService,
    private dialog: MatDialog ,
    private fb:FormBuilder,
    private service:AffectationServiceService) { }

  ngOnInit(): void {
    this.loadAffectationData()
    //this.getAffect()
   // this.getChauff()
    //this.getVoiture()
  }
  loadAffectationData() {
    this.servicedata.affectationData$.pipe(
      take(1)
    ).subscribe(data => {
      if (data==null) {
        this.spinner.show();
        this.service.getAffectation().subscribe((res: any) => {
        if (JSON.stringify(res) !== JSON.stringify(data)) {
          this.servicedata.setAffectationData(res);
          this.data = new MatTableDataSource(res);
          if(this.data.paginator==null&&this.paginator!=null){this.data.paginator = this.paginator;}else{}
        }
        this.spinner.hide();
      });
    }else{this.data = new MatTableDataSource(data);
      if(this.data.paginator==null&&this.paginator!=null){this.data.paginator = this.paginator;}else{}}
    });
  }
  deleteAffectation(element:any){
    this.spinner.show()
    this.service.checkAffectation(element.voiture.idVoiture).pipe(take(1)).subscribe((res:any)=>{
      if(res==true){
        this.toastr.warning("warning ","you can not delete affectation that exist in a task that is in proress or new_task")
        this.spinner.hide()
      
      }else{
        this.service.deleteAffectation(element.voiture.idVoiture).pipe(take(1)).subscribe((res:any)=>{
          if(res){
            this.loadAffectationData()
            this.toastr.success("success","you have deleted affectation with id :"+element.idAffectation+" successfuly")
            this.spinner.hide()
          }
        })
      }
    })
  }

  loadAfterUpdate(){
    this.spinner.show()
    this.service.getAffectation().pipe(take(1)).subscribe((res:any)=>{
      this.servicedata.setAffectationData(res);
      this.data = new MatTableDataSource(res);
      if(this.data.paginator==null&&this.paginator!=null){if(this.data.paginator==null&&this.paginator!=null){this.data.paginator = this.paginator;}else{}}else{
    }
    this.spinner.hide()
    })
    
  }

  updateAffectation(element:any){
    const dialogRef = this.dialog.open(AddAffectationComponent,{
      width: '555px',
      height: '700px',
         //disableClose: true
         data:element

    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==true) {
        this.loadAfterUpdate()
      }
    })
  }
  
  
  /**loadAffectationData() {
    this.servicedata.affectationData$
      .pipe(
        switchMap(data => {
          if (data === null) {
            this.spinner.show();
            return this.service.getAffectation();
          } else {
            return of(data);
          }
        })
      )
      .subscribe(res => {
        this.servicedata.setAffectationData(res);
        this.data = new MatTableDataSource(res);
        this.data.paginator = this.paginator;
        this.spinner.hide();
      });
  }*/
  
  /**loadAffectationData(){
    this.servicedata.affectationData$.subscribe(data=>{
      this.data=new MatTableDataSource(data);
      this.data.paginator=this.paginator;
      if(data=null){
        this.spinner.show()
        this.service.getAffectation().subscribe((res:any)=>{
          this.servicedata.setAffectationData(res);
          this.servicedata.affectationData$.subscribe(resData=>{
            this.data=new MatTableDataSource(resData);
            this.data.paginator=this.paginator
          })
          this.spinner.hide()
        }).unsubscribe()
      }else{
        this.service.getAffectation().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.servicedata.setAffectationData(res);
            this.servicedata.affectationData$.subscribe(dataRes=>{
              this.data=new MatTableDataSource(dataRes);
              this.data.paginator=this.paginator
            }).unsubscribe()
          }
        })
      }
    })
  }*///TODO
  loadChauffeur(){}
  loadVoitures(){}

getAffect(){
  this.service.getAffectation().subscribe((res:any)=>{console.log(res)
    let myStorage=window.localStorage;
      myStorage.setItem("affectation",JSON.stringify(res))
    this.data = new MatTableDataSource(res);
    this.data.paginator = this.paginator;

})
}
 
getChauff(){
  
}
  getVoiture(){
   
  }


  addAffectation(){
    const dialogRef = this.dialog.open(AddAffectationComponent,{
      width: '555px',
      height: '700px',
         //disableClose: true

    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result:any) => {
      if(result==true) {
        this.loadAffectationData()
      }
    })
  }

}
