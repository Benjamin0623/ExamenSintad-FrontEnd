import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { environment } from './../environments/environment';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntidadComponent } from './pages/entidad/entidad.component';
import { EntidadEdicionComponent } from './pages/entidad/entidad-edicion/entidad-edicion.component';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { ContibuyenteEdicionComponent } from './pages/contribuyente/contibuyente-edicion/contibuyente-edicion.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { DocumentoEdicionComponent } from './pages/documento/documento-edicion/documento-edicion.component';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { Not404Component } from './pages/not404/not404.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}
@NgModule({
  declarations: [
    AppComponent,
    EntidadComponent,
    EntidadEdicionComponent,
    ContribuyenteComponent,
    ContibuyenteEdicionComponent,
    DocumentoComponent,
    DocumentoEdicionComponent,
    LoginComponent,
    Not404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: ["http://localhost:8080/login/"]
      },
    })

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi:true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
