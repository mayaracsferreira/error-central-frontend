import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatMenu, MatMenuModule, MatSelectModule, MatTableModule, MatTooltipModule, MatList, MatListModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  },
  {
    path: 'erro',
    component: ErrorPageComponent
  } 
];

@NgModule({
  declarations: [
    ErrorResponseComponent, 
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule
  ],
  entryComponents: [ErrorResponseComponent]
})
export class ErrorCentralModule { }
