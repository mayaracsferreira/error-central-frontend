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

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginModel,
    private ds: AuthenticationService,
    private snackBar: MatSnackBar,) {    
      this.data = new LoginModel();
  }

  ngOnInit() {
  }

  login() {
    console.log(this.data);
    this.ds.login(this.data).subscribe(result => {
      console.log(result);
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
