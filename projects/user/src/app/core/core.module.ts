import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthUserInterceptor } from './interceptors/auth-user.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthUserInterceptor,
    multi:true
  },
    
  ]
})
export class CoreModule { }
