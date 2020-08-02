import { AuthenticationService } from './common/services/authentication.service';
import { RegisterComponent } from './register/register.component';
import { User } from './common/models/user-model';
import { LoginComponent } from './login/login.component';
import { LoginModel } from './common/models/login-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  private dialogRef;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private ds: AuthenticationService
  ) {
    this.ds.currentUser.subscribe(x => this.currentUser = x);
  }

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
    this.dialogRef = this.dialog.open(LoginComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });

  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = User;
    this.dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.ds.logout();
    this.router.navigate(['/bem-vindo']);
  }
}
