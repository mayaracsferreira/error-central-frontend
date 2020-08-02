import { ToastrComponent } from './../common/toastr/toastr.component';
import { User } from './../common/models/user-model';
import { AuthenticationService } from './../common/services/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean;
  constructor(public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private ds: AuthenticationService,
    private snackBar: MatSnackBar,) {
    this.data = new User();
  }

  ngOnInit() {

  }

  register() {
    this.ds.register(this.data).subscribe(result => {
      this.dialogRef.close();
      this.ToastSuccess("Usuário cadastrado com sucesso!");
    },
      error => {
        console.log(error);
        this.ToastError("Não foi possível efetuar o cadastro.");
      });
  }

  public ToastSuccess(mensagem) {
    this.snackBar.openFromComponent(ToastrComponent, {
      data: mensagem,
      panelClass: "sb-success",
      verticalPosition: 'top'
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
