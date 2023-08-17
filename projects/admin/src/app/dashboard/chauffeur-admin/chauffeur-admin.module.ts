import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChauffeurAdminRoutingModule } from './chauffeur-admin-routing.module';
import { ListChauffuerComponent } from './components/list-chauffuer/list-chauffuer.component';
import { AddChauffeurComponent } from './components/add-chauffeur/add-chauffeur.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ListChauffuerComponent,
    AddChauffeurComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    ChauffeurAdminRoutingModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class ChauffeurAdminModule { }
