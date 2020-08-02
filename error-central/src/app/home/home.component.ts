import { RegisterComponent } from './../register/register.component';
import { User } from './../common/models/user-model';
import { LoginModel } from '../common/models/login-model';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openGithub() {
    (window as any).open("https://github.com/mayaracsferreira/error-central", "_blank");
  }

  openLoginDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = LoginModel;
    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);    
  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = User;
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);
  }

}
