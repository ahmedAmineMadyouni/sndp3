import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DeclarationService } from '../../services/declaration.service';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AddDeclarationAccidentComponent } from '../add-declaration-accident/add-declaration-accident.component';
import { AddDeclarationAmendesComponent } from '../add-declaration-amendes/add-declaration-amendes.component';
import { ResponseService } from 'projects/user/src/app/auth/services/response.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
@Component({
  selector: 'app-list-declarations',
  templateUrl: './list-declarations.component.html',
  styleUrls: ['./list-declarations.component.scss']
})
export class ListDeclarationsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;
  
  @ViewChild(MatPaginator, { static: false })
  paginator2!: MatPaginator;

  displayedColumns: string[] = ['idDeclarationAcc', 'numConstat1', 'numConstat2' ,'type','lieu','photo','dateDeclaration','status', 'dateAcident','actions'];
  dataSource :any;
  displayedColumns2: string[] = ['idDeclarationAmendes', 'numAmendes','type' ,'lieu','montant', 'datedeclaration','dateAmendes','status','photo','actions'];
  dataSource2 :any;
  amendesButton=false
  accidentButton=false

  constructor( private dialog: MatDialog,
    private spinner: NgxSpinnerService ,
    private toastr:ToastrService,
    private dataservice:ResponseService,
    private service:DeclarationService) { }

  ngOnInit(): void {
    this.loadAccidentData()
    this.loadAmendesData()
   
    
    //this.getAllAccident()
    //this.getAllAmendes()
  }

  updateDecAccident(element:any){
    if(element.decStatus!=='CANCELED'){
    const dialogRef = this.dialog.open(AddDeclarationAccidentComponent,{
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
  }else{this.toastr.warning("warning","you can not update a canceled declaration")}
  }
  updateDecAmendes(element:any){
    if(element.decStatus!=='CANCELED'){
    const dialogRef = this.dialog.open(AddDeclarationAmendesComponent,{
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
    this.toastr.warning("warning","you can not update a canceled declaration")
  }
  }

  loadAfterUpdateAccident(){
    this.spinner.show()
    this.service.getDeclarationAccident(JSON.parse(localStorage.getItem("token")!).idConducteur).pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setNotAprovedDeclarationAccidentData(res)
        this.dataSource = new MatTableDataSource(res);
      if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator = this.paginator;}else{}
      this.spinner.hide()
    })
  }
  loadAfterUpdateAmendes(){
    this.spinner.show()
    this.service.getDeclarationAmendes(JSON.parse(localStorage.getItem("token")!).idConducteur).pipe(take(1)).subscribe((res:any)=>{
      this.dataSource2 = new MatTableDataSource(res);
      if(this.dataSource2.paginator==null&&this.paginator2!=null){ this.dataSource2.paginator = this.paginator2;}else{}
    this.spinner.hide()
    })
  }
  deleteDecAccident(element:any){
    this.spinner.show()
    if(element.decStatus==='CANCELED'){
    this.service.deleteDeclarationAccident(element.idDeclarationAcc).pipe(take(1)).subscribe((res:any)=>{
      this.loadAfterUpdateAccident()
      this.toastr.success("success","you have deleted declaration accident with description : "+element.description)
      this.accidentButton=!this.accidentButton
      this.spinner.hide()
    })
  }else{
    this.toastr.warning("warning","you can not  delete declaration accident with status : "+element.decStatus +" ")
    this.accidentButton=!this.accidentButton
    this.spinner.hide()
  }
  }
  deleteDecAmendes(element:any){
    this.spinner.show()
    if(element.decStatus==='CANCELED'){
    this.service.deleteDeclarationAmendes(element.idDeclarationAmendes).pipe(take(1)).subscribe((res:any)=>{
        this.loadAfterUpdateAmendes()
        this.toastr.success("success","you have deleted declaration amendes with description : "+element.description)      
      this.amendesButton=!this.amendesButton
      this.spinner.hide()
    })
  }else{
    this.toastr.warning("warning","you can not delete declaration amendes with status : "+element.decStatus)      
    this.amendesButton=!this.amendesButton
    this.spinner.hide()
  }
  }


  loadAccidentData(){
    this.dataservice.notAprovedDeclarationAccidentData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getDeclarationAccident(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setNotAprovedDeclarationAccidentData(res);
            this.dataSource= new MatTableDataSource(res);
             if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator = this.paginator;}else{}
             this.spinner.hide()
          }
        })
      }else{
        this.dataSource= new MatTableDataSource(data);
        if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator = this.paginator;}else{}
      }
    })
  }

  loadAmendesData(){
    this.dataservice.notAprovedDeclarationAmendesData$.pipe(take(2)).subscribe(data=>{
      if(data==null){
        this.spinner.show();
        this.service.getDeclarationAmendes(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setNotAprovedDeclarationAmendesData(res);
            this.dataSource2 = new MatTableDataSource(res);
            if(this.dataSource2.paginator==null&&this.paginator2!=null){ this.dataSource2.paginator = this.paginator2;}else{}
          }
          this.spinner.hide()
        })
      }else{ this.dataSource2 = new MatTableDataSource(data);
        if(this.dataSource2.paginator==null&&this.paginator2!=null){ this.dataSource2.paginator = this.paginator2;}else{}}
    })
  

  }




 


addAccident(){
  const dialogRef = this.dialog.open(AddDeclarationAccidentComponent,{
    width:'750px',
    height:'750px'
  });
  dialogRef.afterClosed().subscribe(resultat=>{
    if(resultat==true){
      this.loadAfterUpdateAccident()
    }
  })
}
addAmendes(){
  const dialogRef = this.dialog.open(AddDeclarationAmendesComponent,{
    width:'750px',
    height:'750px'
  });
  dialogRef.afterClosed().subscribe(resultat=>{
    if(resultat==true){
      this.loadAfterUpdateAmendes()
    }
  })
}




/**  getAllAccident(){
    
    this.service.getDeclarationAccident(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
    const myStorage1 = window.sessionStorage;
    const stringifiedRes1 =JSON.stringify(res);
    if(stringifiedRes1 != myStorage1.getItem("accident")){
      myStorage1.setItem("accident",stringifiedRes1)
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator=this.paginator
    }
  
  })
} */

/**
  getAllAmendes(){if("amendes"in sessionStorage){
    this.dataSource2= new MatTableDataSource(JSON.parse(sessionStorage.getItem("amendes")!));
  console.log(JSON.parse(sessionStorage.getItem("amendes")!))
  }
this.service.getDeclarationAmendes(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
  console.log(res)
  let myStorage = window.sessionStorage;
  const stringifiedRes =JSON.stringify(res);
  if(stringifiedRes !== myStorage.getItem("amendes")){
    myStorage.setItem("amendes",stringifiedRes)
    this.dataSource2=new MatTableDataSource(JSON.parse(stringifiedRes))
    this.dataSource2.paginator2=this.paginator2
  }

})}
 */

}
