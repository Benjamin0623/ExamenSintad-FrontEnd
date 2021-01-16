import { ContribuyenteService } from './../../_service/contribuyente.service';
import { Contribuyente } from './../../_model/Contribuyente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contribuyente',
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.css']
})
export class ContribuyenteComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Contribuyente>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private contribuyenteService:ContribuyenteService,
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.contribuyenteService.contribuyenteCambio.subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
    this.contribuyenteService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
      });
    });
    this.contribuyenteService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }
  eliminar(contribuyente: Contribuyente) {
    this.contribuyenteService
      .eliminar(contribuyente.idTipoContribuyente)
      .pipe(
        switchMap(() => {
          return this.contribuyenteService.listar();
        })
      )
      .subscribe((data) => {
        this.contribuyenteService.contribuyenteCambio.next(data);
        this.contribuyenteService.mensajeCambio.next('Se elimino');
      });
  }



}
