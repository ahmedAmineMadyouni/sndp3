import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAffectationComponent } from './components/list-affectation/list-affectation.component';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';

const routes: Routes = [
  {path:'',component:ListAffectationComponent},
  {path:'addAF',component:AddAffectationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffectationAdminRoutingModule { }
