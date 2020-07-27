import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'error-response',
    component: ErrorResponseComponent,
  }
];

@NgModule({
  declarations: [ErrorResponseComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
  ],
  exports:[
    MatToolbarModule,
    MatIconModule
  ]
})
export class ErrorResponseModule { }
