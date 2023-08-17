import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageFournisseurRoutingModule } from './manage-fournisseur-routing.module';
import { ListFournisseurComponent } from './components/list-fournisseur/list-fournisseur.component';
import { AddFournisseurComponent } from './components/add-fournisseur/add-fournisseur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ListFournisseurComponent,
    AddFournisseurComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    ManageFournisseurRoutingModule
  ]
})
export class ManageFournisseurModule { }
