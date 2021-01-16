import { environment } from './../../environments/environment';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Documento } from './../_model/Documento';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService extends GenericService<Documento>{

  documentoCambio = new Subject<Documento[]>();
  mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(http,
      `${environment.HOST}/documentos`)
   }
}
