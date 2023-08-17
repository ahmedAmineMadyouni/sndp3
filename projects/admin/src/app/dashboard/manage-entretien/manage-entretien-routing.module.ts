import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEntretienComponent } from './components/list-entretien/list-entretien.component';
import { AddEntretienComponent } from './components/add-entretien/add-entretien.component';
import { EntretienDetailsComponent } from './components/entretien-details/entretien-details.component';
import { ListValidEntretienComponent } from './components/list-valid-entretien/list-valid-entretien.component';

const routes: Routes = [
  {path:'',component:ListEntretienComponent},
  {path:'add',component:AddEntretienComponent},
  {path:'valide/entretien',component:ListValidEntretienComponent},
  {path:':id',component:EntretienDetailsComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageEntretienRoutingModule { }
