import { LoginModel } from './common/models/login-model';
import { ErrorCentralModule } from './core/error-central.module';
import { AuthenticationService } from './common/services/authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { MatDialogModule, MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrComponent } from './common/toastr/toastr.component';
import { LoaderComponent } from './core/loader/loader.component';


const appRoutes: Routes = [
  {
    path: 'bem-vindo',
    component: HomeComponent,
  }, 
  {
    path: 'erro',
    loadChildren: './core/error-central.module#ErrorCentralModule'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ToastrComponent,    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true }
    ),
    BrowserModule,
    AppRoutingModule,
    ErrorCentralModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [ToastrComponent, LoginComponent, RegisterComponent]
})
export class AppModule { }
