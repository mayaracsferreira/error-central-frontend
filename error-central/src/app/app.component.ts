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

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private ds: AuthenticationService
  ) {
    this.ds.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log(this.currentUser);
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.router.navigate(['/']);
    });

    

  }

  openRegisterDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = User;
    const dialogRef = this.dialog.open(RegisterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  logout() {
    this.ds.logout();
    this.router.navigate(['/bem-vindo']);
  }
}
