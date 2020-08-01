import { ToastrComponent } from './../../common/toastr/toastr.component';
import { ErrorResponseComponent } from './../error-response/error-response.component';
import { EventLogModel } from './../../common/models/event-log-model';
import { EventlogService } from './../../common/services/eventlog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['eventID', 'level', 'log', 'environment', 'createdDate', 'details', 'archive', 'delete']

  public environments = ['Produção', 'Homologação', 'Desenvolvimento']

  constructor(
    private ds: EventlogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    this.ds.getAll().subscribe(result => {
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

  // archiveEvent() {
  //   this.ds.update();
  // }

  deleteEvent(id: number) {
    this.ds.delete(id).subscribe(
      result => {
        this.ToastSuccess(`Evento ${id} excluído com sucesso!`);
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
