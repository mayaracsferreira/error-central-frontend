import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  dataSource: any;
  public isLoading = false;
  public environments = ['Produção', 'Homologação', 'Desenvolvimento'];
  public fields = ['Level', 'Descrição', 'Origem'];
  public orderFields = ['Level', 'Frequência'];
  selectedEnvironment: string;
  selectedOrderby: string;
  selectedSearch: string;
  inputedValue: string = "";
  groupedColumns = ['eventID', 'level', 'log', 'environment', 'origin', 'frequency'];
  rawColumns = ['eventID', 'level', 'log', 'environment', 'origin', 'details', 'archive', 'delete'];
  displayedColumns: string[] = this.rawColumns;

  constructor(
    private ds: EventlogService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.onSearch();
  }

  limpar() {
    this.displayedColumns = this.rawColumns;
    this.selectedSearch = '';
    this.inputedValue = '';
    this.selectedEnvironment = '';
    this.selectedOrderby = '';
    this.ngOnInit();
  }

  onSearch() {
    this.isLoading = true;
    this.ds.getAll().subscribe(result => {
      this.dataSource = result;
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
        this.ToastError(`Não foi possível carregar dados.`);
      });
  }

  onSearchByField(searchFor: string = '', field: string = '') {
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
      });
  }

  groupEvents() {
    this.isLoading = true;
    var environment: string;
    var orderby: string = "level";
    switch (this.selectedEnvironment) {
      case 'Produção':
        environment = 'production';
        break;
      case 'Desenvolvimento':
        environment = 'development'
        break;
      case 'Homologação':
        environment = 'homologation';
        break;
    }

    switch (this.selectedOrderby) {
      case 'Level':
        orderby = 'level';
        break;
      case 'Frequência':
        orderby = 'frequency'
        break;
    }
    if (this.selectedSearch && this.inputedValue) {
      this.groupAndFilter();    
    }
    else {
      this.ds.groupEvents(environment, orderby).subscribe(result => {
        this.isLoading = false;
        this.displayedColumns = this.groupedColumns;
        this.dataSource = result;
      },
        error => {
          this.isLoading = false;
          this.ToastError(`Erro ao agrupar os dados.`);
        });     
    }
  }

  groupAndFilter() {
    this.isLoading = true;
    var environment: string;
    var orderby: string = "level";
    var searchFor: string;
    switch (this.selectedEnvironment) {
      case 'Produção':
        environment = 'production';
        break;
      case 'Desenvolvimento':
        environment = 'development'
        break;
      case 'Homologação':
        environment = 'homologation';
        break;
    }
    switch (this.selectedOrderby) {
      case 'Level':
        orderby = 'level';
        break;
      case 'Frequência':
        orderby = 'frequency'
        break;
    }

    switch (this.selectedSearch) {
      case 'Level':
        searchFor = 'level';
        break;
      case 'Descrição':
        searchFor = 'description'
        break;
      case 'Origem':
        searchFor = 'origin';
        break;
    }
    this.ds.groupAndFilter(environment, orderby, searchFor, this.inputedValue).subscribe(result => {
      this.isLoading = false;
      this.dataSource = result;
    },
      error => {
        this.isLoading = false;
        this.ToastError(`Não foram encontrados valores de ${this.selectedSearch} que satisfaçam a busca.`);
      });

  }

  searchFilter(args) {
    this.isLoading = true;
    var searchFor: string;
    switch (this.selectedSearch) {
      case 'Level':
        searchFor = 'level';
        break;
      case 'Descrição':
        searchFor = 'description'
        break;
      case 'Origem':
        searchFor = 'origin';
        break;
    }

    if (this.selectedEnvironment) {
      this.groupAndFilter();
    }
    else {
      this.ds.getByField(searchFor, args).subscribe(result => {
        this.isLoading = false;
        this.dataSource = result;
      },
        error => {
          this.isLoading = false;
          this.ToastError(`Não foram encontrados valores de ${this.selectedSearch} que satisfaçam a busca.`);
        });
    }
  }

  archiveEvent(id: number) {
    this.isLoading = true;
    this.openDialog("Deseja arquivar evento? Não será possível desfazer a ação!").afterClosed().subscribe(action => {
      if (action === 'Confirm') {
        this.ds.archive(id).subscribe(
          result => {
            this.isLoading = false;
            this.ToastSuccess(`Evento ${id} arquivado com sucesso!`);
            //refresh data na tabela
            this.ngOnInit();
          },
          error => {
            this.isLoading = false;
            this.ToastError(`Não foi possível arquivar o evento ${id}.`);
          });
      }
      else{
        this.isLoading = false;
      }
    });
  }

  deleteEvent(id: number) {
    this.isLoading = true;
    this.openDialog("Deseja excluir evento?").afterClosed().subscribe(action => {
      if (action === 'Confirm') {
        this.ds.delete(id).subscribe(
          result => {
            this.isLoading = false;
            this.ToastSuccess(`Evento ${id} excluído com sucesso!`);
            //refresh data na tabela
            this.ngOnInit();
          },
          error => {
            this.isLoading = false;
            this.ToastError(`Não foi possível excluir o evento ${id}.`);
          });
      }
      else{
        this.isLoading = false;
      }
    });
  }

  openDialog(message){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.data = message;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    return dialogRef;
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
