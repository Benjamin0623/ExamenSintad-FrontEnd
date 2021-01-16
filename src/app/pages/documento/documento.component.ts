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
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {

  displayedColumns = ['id', 'codigo', 'nombre','descripcion','acciones'];
  dataSource: MatTableDataSource<Documento>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private documentoService:DocumentoService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.documentoService.documentoCambio.subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.documentoService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });
    this.documentoService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  eliminar(documento: Documento) {
    this.documentoService
      .eliminar(documento.idTipoDocumento)
      .pipe(
        switchMap(() => {
          return this.documentoService.listar();
        })
      )
      .subscribe((data) => {
        this.documentoService.documentoCambio.next(data);
        this.documentoService.mensajeCambio.next('Se elimino');
      });
  }

}
