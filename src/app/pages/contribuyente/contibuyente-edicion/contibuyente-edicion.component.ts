import { Contribuyente } from './../../../_model/Contribuyente';
import { EstadoDTO } from './../../../_model/EstadoDTO';
import { ContribuyenteService } from './../../../_service/contribuyente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contibuyente-edicion',
  templateUrl: './contibuyente-edicion.component.html',
  styleUrls: ['./contibuyente-edicion.component.css']
})
export class ContibuyenteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  estados: EstadoDTO[]=[
    {codigo:true, nombre:'Activo'},
    {codigo:false, nombre:'Inactivo'}
  ]
  estadoSeleccionado:boolean=true;

  constructor(
    private route: ActivatedRoute, private contribuyenteService: ContribuyenteService, private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)])
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
      this.contribuyenteService.listarPorId(this.id).subscribe(data => {
        //console.log(data);
        this.form = new FormGroup({
          'id': new FormControl(data.idTipoContribuyente),
          'nombre': new FormControl(data.nombre)
        });
        this.estadoSeleccionado=data.estado;
      });
    }

  }
  operar() {
    if(this.form.invalid){return;}
    let contribuyente = new Contribuyente();
    contribuyente.idTipoContribuyente = this.form.value['id']
    contribuyente.nombre = this.form.value['nombre']
    contribuyente.estado = this.estadoSeleccionado;

    if (this.edicion) {
      //MODIFICAR
      this.contribuyenteService.modificar(contribuyente).pipe(switchMap(() => {
        return this.contribuyenteService.listar();
      })).subscribe(data => {
        this.contribuyenteService.contribuyenteCambio.next(data);
        this.contribuyenteService.mensajeCambio.next("Se modificó");
      });
    } else {
      //INSERTAR
      this.contribuyenteService.registrar(contribuyente).pipe(switchMap(() => {
        return this.contribuyenteService.listar();
      })).subscribe(data => {
        this.contribuyenteService.contribuyenteCambio.next(data);
        this.contribuyenteService.mensajeCambio.next("Se registro");
      });
    }
    this.router.navigate(['contribuyente'])
  }

}
