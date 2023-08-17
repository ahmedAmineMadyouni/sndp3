import { Component, OnInit } from '@angular/core';
import { DeclarationDetailsService } from '../../services/declaration-details.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DeclarationService } from '../../services/declaration.service';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { take } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-declaration-amendes-details',
  templateUrl: './declaration-amendes-details.component.html',
  styleUrls: ['./declaration-amendes-details.component.scss']
})
export class DeclarationAmendesDetailsComponent implements OnInit {
   
  data:any
  isInputDisabled=false
  constructor(private serviceData :DeclarationDetailsService,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private service:DeclarationService,
    private dataService :AdminDataService,
    private location: Location){}
  
  ngOnInit(): void {
     this.loadDetailsData()
   }


   loadDetailsData(){
    this.spinner.show()
    this.serviceData.declarationAmendesDetailsData$.pipe(take(1)).subscribe(data=>{
      this.data=data
      console.log(this.data)
      this.spinner.hide()
    })
   }

   loadNotValidAmendesAfterUpdate(){
    this.spinner.show()
    this.service.getAllDeclarationAmendes().pipe(take(1)).subscribe((res:any)=>{
      this.dataService.setNotValideDeclarationAmendesData(res);
      this.spinner.hide()
    })
  }
  
  goBack(): void {

    this.location.back();
  }
  

}

