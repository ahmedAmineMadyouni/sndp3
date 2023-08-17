import { Component, OnInit } from '@angular/core';
import { DeclarationDetailsService } from '../../services/declaration-details.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { DeclarationService } from '../../services/declaration.service';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-declaration-accident-details',
  templateUrl: './declaration-accident-details.component.html',
  styleUrls: ['./declaration-accident-details.component.scss']
})
export class DeclarationAccidentDetailsComponent implements OnInit {
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
    this.serviceData.declarationAccidentDetailsData$.subscribe(data=>{
      this.data=data
      console.log(data)
      this.spinner.hide()
    })
   }



  loadNotValidAccidentAfterUpdate(){
    this.spinner.show()
    this.service.getAllDeclarationAccident().pipe(take(1)).subscribe((res:any)=>{
      this.dataService.setNotValideDeclarationAccidentData(res);
      this.spinner.hide()
    })
  }


  goBack(): void {

    this.location.back();
  }
  


}
