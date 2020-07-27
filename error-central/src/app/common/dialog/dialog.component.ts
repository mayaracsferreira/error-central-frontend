import { IDialogData } from './dialog-data';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public dialogTitle: string;
  public confirmButtonText: string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
    this.dialogTitle = data.dialogTitle;
    this.confirmButtonText = data.confirmButtonText;
  }

  ngOnInit() {
  }
  
  public confirm() {
    this.dialogRef.close('Confirm');
  }

}
