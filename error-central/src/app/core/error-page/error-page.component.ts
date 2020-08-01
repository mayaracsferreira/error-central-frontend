import { ErrorResponseComponent } from './../error-response/error-response.component';
import { EventLogModel } from './../../common/models/event-log-model';
import { EventlogService } from './../../common/services/eventlog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';

enum EnvironmentEnum {
  production = 1,
  development = 2,
  homologation = 3,
}

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['eventID', 'level', 'createdDate', 'details', 'archive', 'delete']

  public environments = ['Produção', 'Homologação', 'Dev']

  constructor(
    private ds: EventlogService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.onSearch();
  }

  onSearch() {
    this.ds.getAll().subscribe(result => {
      this.dataSource = result;
    });
  }

  delete(id: number){
    this.ds.delete(id);
  }

  openLoginDialog(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = { id: id };
    const dialogRef = this.dialog.open(ErrorResponseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
