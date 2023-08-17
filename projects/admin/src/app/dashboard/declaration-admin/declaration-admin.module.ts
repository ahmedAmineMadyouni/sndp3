import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeclarationAdminRoutingModule } from './declaration-admin-routing.module';
import { ListDeclarationsComponent } from './components/list-declarations/list-declarations.component';
import { AddAmendesComponent } from './components/add-amendes/add-amendes.component';
import { AddAccidentComponent } from './components/add-accident/add-accident.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { DeclarationAccidentDetailsComponent } from './components/declaration-accident-details/declaration-accident-details.component';
import { DeclarationAmendesDetailsComponent } from './components/declaration-amendes-details/declaration-amendes-details.component';
import { ListAmendesComponent } from './components/list-amendes/list-amendes.component';
import { ListAccidentComponent } from './components/list-accident/list-accident.component';


@NgModule({
  declarations: [
    ListDeclarationsComponent,
    AddAmendesComponent,
    AddAccidentComponent,
    DeclarationAccidentDetailsComponent,
    DeclarationAmendesDetailsComponent,
    ListAmendesComponent,
    ListAccidentComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    DeclarationAdminRoutingModule
  ]
})
export class DeclarationAdminModule { }
