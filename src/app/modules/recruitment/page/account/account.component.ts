import { CustomValidators } from 'ngx-custom-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtAuthService } from 'src/app/shared/services/auth/jwt-auth.service';
import { UserService } from 'src/app/data/service/user.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss']
})

export class AccountComponent implements OnInit {
    formPassword: FormGroup;
    formAccount: FormGroup;
    user: any;
    constructor(private jwt: JwtAuthService, private userService: UserService, private messageService: MessageService) { }

    ngOnInit() { 
        this.user = this.jwt.getUser();
        console.log(this.user)
        const passwordAct = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
        ]);
        const password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
            Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}")
        ]);
        const confirmPassword = new FormControl(
            '',
            CustomValidators.equalTo(password)
        );

        this.formPassword = new FormGroup({
           idUser: new FormControl('', null),
           passwordActual: passwordAct,
           passwordWithoutEncryption: password,
           passwordConfirm: confirmPassword,
        });

        this.formPassword.get('idUser').setValue(this.user?.id);

        const passwordDel = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
        ]);

        this.formAccount = new FormGroup({
            idPerson: new FormControl(this.user.idPerson, null),
            idUser: new FormControl(this.user.id, null),
            passwordActual: passwordDel,
            motivo: new FormControl('', [Validators.required])
        });

        this.formAccount.get('idUser').setValue(this.user?.id);
        this.formAccount.get('idPerson').setValue(this.user?.idPerson);
    }

    submitPassword() {
          this.userService.changePaswordConfig(this.formPassword.value).subscribe(
              res => {
                  if (res.stateCode == 200) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Contraseña actualizada correctamente',
                    });
                    this.clearFormPassword();
                  } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.messageError[0],
                    });
                  }
              }
          )
    }

    submitAccount() {
        debugger;
        this.userService.deleteuser(this.formAccount.value).subscribe(
            res => {
                if (res.stateCode == 200) {
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Success',
                      detail: 'Cuenta eliminada correctamente',
                  });
                  setInterval(() => {
                    this.clearFormPassword();
                    this.jwt.signout();
                  }, 2000);
                  
                } else {
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: res.messageError[0],
                  });
                }
            }
        )
    }

    clearFormPassword() {
        this.formPassword.reset();
    }

    clearFormAccount() {
        this.formAccount.reset();
    }
}
