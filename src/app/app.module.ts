import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { EntidadEdicionComponent } from './pages/entidad/entidad-edicion/entidad-edicion.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { ContibuyenteEdicionComponent } from './pages/contribuyente/contibuyente-edicion/contibuyente-edicion.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { DocumentoEdicionComponent } from './pages/documento/documento-edicion/documento-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    EntidadComponent,
    EntidadEdicionComponent,
    ContribuyenteComponent,
    ContibuyenteEdicionComponent,
    DocumentoComponent,
    DocumentoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
