import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFournisseurComponent } from './components/list-fournisseur/list-fournisseur.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';

const routes: Routes = [
  {path:'',component:ListFournisseurComponent},
  {path:'add',component:AddFournisseurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageFournisseurRoutingModule { }
