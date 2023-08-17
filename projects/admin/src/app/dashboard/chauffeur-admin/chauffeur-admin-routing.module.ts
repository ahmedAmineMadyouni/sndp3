import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListChauffuerComponent } from './components/list-chauffuer/list-chauffuer.component';
import { AddChauffeurComponent } from './components/add-chauffeur/add-chauffeur.component';

const routes: Routes = [
  {path:'',component:ListChauffuerComponent},
  {path:'add',component:AddChauffeurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChauffeurAdminRoutingModule { }
