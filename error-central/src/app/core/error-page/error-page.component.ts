import { ToastrComponent } from './../../common/toastr/toastr.component';
import { ErrorResponseComponent } from './../error-response/error-response.component';
import { EventLogModel } from './../../common/models/event-log-model';
import { EventlogService } from './../../common/services/eventlog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  dataSource: any;
  public environments = ['Produção', 'Homologação', 'Desenvolvimento'];
  public fields = ['Level', 'Descrição', 'Origem'];
  public orderFields = ['Level', 'Frequency'];
  OrderbyField: any;
  SearchField: any;
  SearchValue: any;
  displayedColumns: string[] = ['eventID', 'level', 'log', 'environment', 'origin', 'details', 'archive', 'delete']  

  constructor(
    private ds: EventlogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {    
    this.onSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}

  onSearch() {
    this.ds.getAll().subscribe(result => {
      this.dataSource = result;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onSearchByField(searchFor : string = '', field: string = '') {
    this.ds.getByField(searchFor, field).subscribe(result => {
      this.dataSource = result;
    });
  }

  openDetailDialog(model) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = model;
    const dialogRef = this.dialog.open(ErrorResponseComponent, dialogConfig);
  }

  getEventDetails(id: number) {
    this.ds.getById(id).subscribe(
      result => {
        this.openDetailDialog(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  archiveEvent(id: number) {
    this.ds.update(id).subscribe(
      result => {
        this.ToastSuccess(`Evento ${id} arquivado com sucesso!`);
        //refresh data na tabela
        this.ngOnInit();
      },
      error => {
        this.ToastError(`Não foi possível arquivar o evento ${id}.`);
      });
  }

  deleteEvent(id: number) {
    this.ds.delete(id).subscribe(
      result => {
        this.ToastSuccess(`Evento ${id} excluído com sucesso!`);
        //refresh data na tabela
        this.ngOnInit();
      },
      error => {
        this.ToastError(`Não foi possível excluir o evento ${id}.`);
      });
  }

  public ToastSuccess(mensagem) {
    this.snackBar.openFromComponent(ToastrComponent, {
      data: mensagem,
      panelClass: "sb-success",
      verticalPosition: 'top'
    });
  }

  public ToastInfo(mensagem) {
    this.snackBar.openFromComponent(ToastrComponent, {
      data: mensagem,
      panelClass: "sb-info",
      verticalPosition: 'top'
    });
  }

  ToastError(mensagem) {
    this.snackBar.openFromComponent(ToastrComponent, {
      data: mensagem,
      panelClass: "sb-danger",
      verticalPosition: 'top'
    });
  }

}
