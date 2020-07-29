import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatMenu, MatMenuModule, MatSelectModule, MatTableModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  },
  {
    path: 'error-response',
    component: ErrorResponseComponent,
  }
];

@NgModule({
  declarations: [ErrorResponseComponent, ErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule
  ]
})
export class ErrorCentralModule { }
