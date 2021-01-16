import { GenericService } from './generic.service';
import { Entidad } from './../_model/Entidad';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntidadService extends GenericService<Entidad>{

  entidadCambio = new Subject<Entidad[]>();
  mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(http,
      `${environment.HOST}/entidades`)
   }
}
