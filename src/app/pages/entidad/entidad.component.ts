import { Entidad } from './../../_model/Entidad';
import { EntidadService } from './../../_service/entidad.service';
import { ContribuyenteService } from './../../_service/contribuyente.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentoService } from './../../_service/documento.service';
import { Documento } from './../../_model/Documento';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

  displayedColumns = ['id', 'documento', 'nroDoc','razon','nombre','contribuyente','direccion','telefono','acciones'];
  dataSource: MatTableDataSource<Entidad>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private entidadService:EntidadService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.entidadService.entidadCambio.subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.entidadService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });
    this.entidadService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  eliminar(entidad: Entidad) {
    this.entidadService
      .eliminar(entidad.idEntidad)
      .pipe(
        switchMap(() => {
          return this.entidadService.listar();
        })
      )
      .subscribe((data) => {
        this.entidadService.entidadCambio.next(data);
        this.entidadService.mensajeCambio.next('Se elimino');
      });
  }

}

