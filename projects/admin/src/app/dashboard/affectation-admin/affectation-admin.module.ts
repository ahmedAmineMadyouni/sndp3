import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffectationAdminRoutingModule } from './affectation-admin-routing.module';
import { ListAffectationComponent } from './components/list-affectation/list-affectation.component';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ListAffectationComponent,
    AddAffectationComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    AffectationAdminRoutingModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class AffectationAdminModule { }
