import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandesEntretienComponent } from './components/list-demandes-entretien/list-demandes-entretien.component';
import { AddDemandesEntretienComponent } from './components/add-demandes-entretien/add-demandes-entretien.component';
import { ListEntretienUserComponent } from './components/list-entretien-user/list-entretien-user.component';

const routes: Routes = [
  {path:'',component:ListDemandesEntretienComponent},
  {path:'add/Entretien',component:AddDemandesEntretienComponent},
  {path:'y',component:ListEntretienUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDemandesRoutingModule { }
