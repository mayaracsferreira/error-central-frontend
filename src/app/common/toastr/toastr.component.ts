import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css']
})
export class ToastrComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<ToastrComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
