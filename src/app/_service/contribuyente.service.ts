import { environment } from './../../environments/environment';
import { Contribuyente } from './../_model/Contribuyente';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService extends GenericService<Contribuyente>{

  contribuyenteCambio = new Subject<Contribuyente[]>();
  mensajeCambio = new Subject<string>();
  constructor(protected http: HttpClient) {
    super(http,
      `${environment.HOST}/contribuyentes`)
   }
}
