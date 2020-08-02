import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.css']
})
export class ErrorResponseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {

  }

}
