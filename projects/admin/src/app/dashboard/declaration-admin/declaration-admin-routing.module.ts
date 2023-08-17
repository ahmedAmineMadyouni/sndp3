import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeclarationsComponent } from './components/list-declarations/list-declarations.component';
import { AddAmendesComponent } from './components/add-amendes/add-amendes.component';
import { AddAccidentComponent } from './components/add-accident/add-accident.component';
import { ListAmendesComponent } from './components/list-amendes/list-amendes.component';
import { ListAccidentComponent } from './components/list-accident/list-accident.component';
import { DeclarationAccidentDetailsComponent } from './components/declaration-accident-details/declaration-accident-details.component';
import { DeclarationAmendesDetailsComponent } from './components/declaration-amendes-details/declaration-amendes-details.component';

const routes: Routes = [
  {path:'',component:ListDeclarationsComponent},
  {path:'add/amendes',component:AddAmendesComponent},
  {path:'add/accident',component:AddAccidentComponent},
  {path:'amendes',component:ListAmendesComponent},
  {path:'accident',component:ListAccidentComponent},
  {
    path:':id', 
    component:DeclarationAccidentDetailsComponent},
  {path:'declarationAmendes/:iddeclaration',component:DeclarationAmendesDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclarationAdminRoutingModule { }
