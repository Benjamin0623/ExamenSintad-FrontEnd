import { Documento } from './../../../_model/Documento';
import { DocumentoService } from './../../../_service/documento.service';

import { EstadoDTO } from './../../../_model/EstadoDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-documento-edicion',
  templateUrl: './documento-edicion.component.html',
  styleUrls: ['./documento-edicion.component.css']
})
export class DocumentoEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  estados: EstadoDTO[]=[
    {codigo:true, nombre:'Activo'},
    {codigo:false, nombre:'Inactivo'}
  ]
  estadoSeleccionado:boolean=true;

  constructor(
    private route: ActivatedRoute, private documentoService: DocumentoService, private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'codigo': new FormControl(''),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    })
  }
  initForm() {

    //EDITAR, por lo tanto carga la data
    if (this.edicion) {
      this.documentoService.listarPorId(this.id).subscribe(data => {
        //console.log(data);
        this.form = new FormGroup({
          'id': new FormControl(data.idTipoDocumento),
          'codigo':new FormControl(data.codigo),
          'nombre': new FormControl(data.nombre),
          'descripcion':new FormControl(data.descripcion)
        });
        this.estadoSeleccionado=data.estado;
      });
    }

  }
  operar() {
    if(this.form.invalid){return;}
    let documento = new Documento();
    documento.idTipoDocumento = this.form.value['id']
    documento.codigo = this.form.value['codigo']
    documento.estado = this.estadoSeleccionado;
    documento.nombre = this.form.value['nombre']
    documento.descripcion = this.form.value['descripcion']

    if (this.edicion) {
      //MODIFICAR
      this.documentoService.modificar(documento).pipe(switchMap(() => {
        return this.documentoService.listar();
      })).subscribe(data => {
        this.documentoService.documentoCambio.next(data);
        this.documentoService.mensajeCambio.next("Se modificó");
      });
    } else {
      //INSERTAR
      this.documentoService.registrar(documento).pipe(switchMap(() => {
        return this.documentoService.listar();
      })).subscribe(data => {
        this.documentoService.documentoCambio.next(data);
        this.documentoService.mensajeCambio.next("Se registro");
      });
    }
    this.router.navigate(['documento'])
  }

}
