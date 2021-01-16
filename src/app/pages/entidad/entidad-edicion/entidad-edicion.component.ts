
import { EntidadService } from './../../../_service/entidad.service';
import { ContribuyenteService } from './../../../_service/contribuyente.service';
import { Contribuyente } from './../../../_model/Contribuyente';
import { Documento } from './../../../_model/Documento';
import { DocumentoService } from './../../../_service/documento.service';

import { EstadoDTO } from './../../../_model/EstadoDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Entidad } from 'src/app/_model/Entidad';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-entidad-edicion',
  templateUrl: './entidad-edicion.component.html',
  styleUrls: ['./entidad-edicion.component.css']
})
export class EntidadEdicionComponent implements OnInit {

  form: FormGroup;
  documentos: Documento[] = [];
  contribuyentes: Contribuyente[] = [];
  entidad: Entidad;
  documento: Documento;
  contribuyente: Contribuyente;
  documentoSeleccionado: number;
  contribuyenteSeleccionado: number;
  id: number;
  edicion: boolean;

  estados: EstadoDTO[] = [
    { codigo: true, nombre: 'Activo' },
    { codigo: false, nombre: 'Inactivo' }
  ]
  estadoSeleccionado: boolean = true;

  constructor(
    private route: ActivatedRoute, private documentoService: DocumentoService,
    private contribuyenteService: ContribuyenteService,
    private entidadService: EntidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.entidad = new Entidad();
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nroDoc': new FormControl(''),
      'razon': new FormControl(''),
      'nombre': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl('')
    });
    this.listaDocumentos();
    this.listaContribuyentes();

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }
  initForm() {

    //EDITAR, por lo tanto carga la data
    if (this.edicion) {
      this.entidadService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idEntidad),
          'nroDoc': new FormControl(data.nroDocumento),
          'razon': new FormControl(data.razonSocial),
          'nombre': new FormControl(data.nombreComercial),
          'direccion': new FormControl(data.direccion),
          'telefono': new FormControl(data.telefono)
        });
        this.documentoSeleccionado = data.documento.idTipoDocumento;
        this.contribuyenteSeleccionado = data.contribuyente.idTipoContribuyente;
        this.traeContribuyente();
        this.traeDocumento();
        this.estadoSeleccionado = data.estado;
      });
    }

  }
  operar() {
    if (this.form.invalid) { return; }
    let entidad = new Entidad();
    entidad.idEntidad = this.form.value['id']
    entidad.documento = this.documento;
    entidad.nroDocumento = this.form.value['nroDoc']
    entidad.razonSocial = this.form.value['razon']
    entidad.nombreComercial = this.form.value['nombre']
    entidad.contribuyente = this.contribuyente;
    entidad.direccion = this.form.value['direccion']
    entidad.telefono = this.form.value['telefono']
    entidad.estado = this.estadoSeleccionado;

    if (this.edicion) {
      //MODIFICAR
      this.entidadService.modificar(entidad).pipe(switchMap(() => {
        return this.entidadService.listar();
      })).subscribe(data => {
        this.entidadService.entidadCambio.next(data);
        this.entidadService.mensajeCambio.next("Se modificó");
      });
    } else {
      //INSERTAR
      this.entidadService.registrar(entidad).pipe(switchMap(() => {
        return this.entidadService.listar();
      })).subscribe(data => {
        this.entidadService.entidadCambio.next(data);
        this.entidadService.mensajeCambio.next("Se registro");
      });
    }
    this.router.navigate(['entidad'])
  }
  traeDocumento() {
    this.documentoService.listarPorId(this.documentoSeleccionado).subscribe(data => {
      this.documento = data;
    });
  }
  traeContribuyente() {
    this.contribuyenteService.listarPorId(this.contribuyenteSeleccionado).subscribe(data => {
      this.contribuyente = data;
    });
  }

  listaDocumentos() {
    this.documentoService.listar().subscribe(data => {
      this.documentos = data;
    });
  }
  listaContribuyentes() {
    this.contribuyenteService.listar().subscribe(data => {
      this.contribuyentes = data;
    });
  }


}

