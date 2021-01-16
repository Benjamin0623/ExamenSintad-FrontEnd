import { Contribuyente } from './Contribuyente';
import { Documento } from './Documento';
export class Entidad{
  idEntidad:number;
  documento:Documento;
  nroDocumento:string;
  razonSocial:string;
  nombreComercial:string;
  contribuyente:Contribuyente;
  direccion:string;
  telefono:string;
  estado:boolean;
}
