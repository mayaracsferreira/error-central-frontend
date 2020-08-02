import { User } from './../common/models/user-model';
import { ToastrComponent } from './../common/toastr/toastr.component';
import { AuthenticationService } from './../common/services/authentication.service';
import { LoginModel } from '../common/models/login-model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean;
  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginModel,
    private ds: AuthenticationService,
    private snackBar: MatSnackBar,) {
    this.data = new LoginModel();
    this.hidePassword = false;
  }

  ngOnInit() {
  }

  login() {
    this.ds.login(this.data).subscribe(result => {
      this.dialogRef.close();
    },
      error => {
        this.ToastError("Não foi possível encontrar usuário com o e-mail informado");
      });
  }

  ToastError(mensagem) {
    this.snackBar.openFromComponent(ToastrComponent, {
      data: mensagem,
      panelClass: "sb-danger",
      verticalPosition: 'top'
    });
  }
}
