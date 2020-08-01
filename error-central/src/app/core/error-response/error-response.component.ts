import { MAT_DIALOG_DATA } from '@angular/material';
import { EventLogModel } from './../../common/models/event-log-model';
import { EventlogService } from './../../common/services/eventlog.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-error-response',
  templateUrl: './error-response.component.html',
  styleUrls: ['./error-response.component.css']
})
export class ErrorResponseComponent implements OnInit {

  model: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private ds: EventlogService
  ) { }

  ngOnInit() {
    this.ds.getById(this.data.id).subscribe(
      result => {
        this.model = result;
      },
      error => {
        console.log(error);
      }
    );
  }

}
