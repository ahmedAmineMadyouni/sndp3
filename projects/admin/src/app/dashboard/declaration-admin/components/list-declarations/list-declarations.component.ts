import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeclarationService } from '../../services/declaration.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { ToastrService } from 'ngx-toastr';
import { DeclarationDetailsService } from '../../services/declaration-details.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-declarations',
  templateUrl: './list-declarations.component.html',
  styleUrls: ['./list-declarations.component.scss']
})
export class ListDeclarationsComponent implements OnInit {
  displayedColumns: string[] = ['idDeclarationAcc', 'numConstat1', 'numConstat2' ,'description','type','lieu','photo','dateDeclaration', 'dateAcident','actions'];
  dataSource :any;
  displayedColumns2: string[] = ['idDeclarationAmendes', 'numAmendes', 'detail','type' ,'lieu','montant', 'datedeclaration','dateAmendes','photo','actions'];
  dataSource2 :any;
  tasksFilter!:FormGroup
  public isButtonDisabled = false;
  constructor(private dialog: MatDialog ,
    private dataservice:AdminDataService,
    private deatilsService: DeclarationDetailsService,
    private toastr:ToastrService,
    private service:DeclarationService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   this.loadNotValidAccident()
   this.loadNotValidAmendes()
    //this.getAllDeclarationAccident();
    //this.getAllDeclarationAmendes();
  }


  seeDetailsAccident(x:any){
    this.deatilsService.setDeclarationAccidentDetailsData(this.dataSource[x]);
    
  }
  seeDetailsAmendes(x:any){
    this.deatilsService.setDeclarationAmendesDetailsData(this.dataSource2[x]);
    
  }


  loadNotValidAccidentAfterUpdate(){
    this.spinner.show()
    this.service.getAllDeclarationAccident().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setNotValideDeclarationAccidentData(res);
        this.dataSource=res;
      this.spinner.hide()
    })
  }

  loadNotValidAccident(){
    this.dataservice.notValideDeclarationAccidentData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getAllDeclarationAccident().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setNotValideDeclarationAccidentData(res);
              this.dataSource=res;
          }
          this.spinner.hide()
        })
      }else{
        this.dataSource=data 
      }
    })
  }
  
  cancelAccident(item:any){
    this.spinner.show()
    this.service.cancelDeclarationAccident(item.idDeclarationAcc).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        this.loadNotValidAccidentAfterUpdate()
        this.toastr.success("SUCCESS"," you have canceld declaration accident with type::"+item.type+" Successfully")
      }
      this.spinner.hide()
    })
  
  }
  cancelAmendes(item:any){
    
      this.spinner.show()
      this.service.cancelDeclarationAmendes(item.idDeclarationAmendes).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.loadNotValidAmendesAfterUpdate()
          this.toastr.success("SUCCESS"," you have canceld declaration amendes num°:"+item.numAmendes+" Successfully")
          this.spinner.hide()
        }
        this.spinner.hide()
      })
    
  }
  loadNotValidAmendesAfterUpdate(){
    this.spinner.show()
    this.service.getAllDeclarationAmendes().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setNotValideDeclarationAmendesData(res);
    
        this.dataSource2=res;
      this.spinner.hide()
    })
  }


  loadNotValidAmendes(){
    this.dataservice.notValideDeclarationAmendesData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getAllDeclarationAmendes().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setNotValideDeclarationAmendesData(res);
              this.dataSource2=res;
          }
          this.spinner.hide()
        })
      }else{
        this.dataSource2=data
      }
    })
  }

  validateAccident(item:any){
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.spinner.show()
    this.service.validateAccident(item.idDeclarationAcc).pipe(take(1)).subscribe((res:any)=>{
      console.log(res)
      this.isButtonDisabled = false;
      this.loadNotValidAccidentAfterUpdate()
       this.spinner.hide()
    })
    
  }

  validateAmendes(item: any) {
    if (this.isButtonDisabled) {
      return;
    }
    this.isButtonDisabled = true;
    this.spinner.show();
    this.service.validateAmendes(item.idDeclarationAmendes).pipe(take(1)).subscribe((res:any) => {
      console.log(res);
      this.isButtonDisabled = false;
      this.loadNotValidAmendesAfterUpdate()
      this.spinner.hide();
    });
   
  }
  getAllDeclarationAccident(){
    this.spinner.show()
    this.service.getAllDeclarationAccident().pipe(take(1)).subscribe((res:any)=>{
      if(res){
      this.dataSource=res}
      
      
    })
   
    
  }
  //setTimeout(() => {
    /** spinner ends after 5 seconds */
    //this.spinner.hide();
  //}, 1998);
  getAllDeclarationAmendes(){
    this.spinner.show()
    this.service.getAllDeclarationAmendes().subscribe((res:any)=>{
      this.dataSource2=res
    })
    this.spinner.hide()
    
  }

}
