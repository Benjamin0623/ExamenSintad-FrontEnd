import { Not404Component } from './pages/not404/not404.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { EntidadEdicionComponent } from './pages/entidad/entidad-edicion/entidad-edicion.component';
import { DocumentoEdicionComponent } from './pages/documento/documento-edicion/documento-edicion.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { ContibuyenteEdicionComponent } from './pages/contribuyente/contibuyente-edicion/contibuyente-edicion.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContribuyenteComponent } from './pages/contribuyente/contribuyente.component';
import { EntidadComponent } from './pages/entidad/entidad.component';

const routes: Routes = [

  {
    path: 'contribuyente', component: ContribuyenteComponent, children: [
      { path: 'nuevo', component: ContibuyenteEdicionComponent },
      { path: 'edicion/:id', component: ContibuyenteEdicionComponent }
    ], canActivate:[GuardService]
  },
  {
    path: 'documento', component: DocumentoComponent, children: [
      { path: 'nuevo', component: DocumentoEdicionComponent },
      { path: 'edicion/:id', component: DocumentoEdicionComponent }
    ], canActivate:[GuardService]
  },
  {
    path: 'entidad', component: EntidadComponent, children: [
      { path: 'nuevo', component: EntidadEdicionComponent },
      { path: 'edicion/:id', component: EntidadEdicionComponent }
    ], canActivate:[GuardService]
  },
  { path: 'login', component:LoginComponent},
  { path: 'not-404', component:Not404Component},
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: '**', redirectTo: 'not-404', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
