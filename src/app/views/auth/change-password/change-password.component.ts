import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { UserService } from './../../../data/service/user.service';
import { LocalStoreService } from './../../../shared/services/local-store.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.component.html',
    styleUrls: ['change-password.compoent.scss']
})
export class ChangePasswordComponent implements OnInit {
    APP_USER = "GRUPOFE_USER";
    changePasswordForm: FormGroup;
    userid = 0;
    codereset = '';
    uservalid = false;
    codevalid = false;
    changewithcode = false;
    constructor(
        private userService: UserService,
        private ls: LocalStoreService,
        public jwtAuth: JwtAuthService,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
        clearInterval();
    }

    ngOnInit() {
        this.route.queryParams.subscribe((p: any) => {
            if (p.user) {
                this.userid = p.user;
            }
            if (p.tokenresetpassword) {
                this.codereset = p.tokenresetpassword;
            }
        });

        if (
            this.userid !== undefined &&
            this.userid !== null &&
            this.userid !== 0
        ) {
            this.uservalid = true;
        }
        if (this.codereset !== undefined && this.codereset !== null) {
            this.codevalid = true;
        }
        if (this.codevalid && this.uservalid) {
            this.changewithcode = true;
        }

        if (this.changewithcode == true) {
            this.userService
                .getValidRessetPassword(this.userid, this.codereset)
                .subscribe(
                    (data) => {
                        if (data !== null && data !== undefined) {
                            if (data.stateCode !== 200) {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'Código inválido',
                                    life: 4000
                                });
                                this.jwtAuth.signout();
                            }
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Código inválido',
                                life: 4000
                            });
                            this.jwtAuth.signout();
                        }
                    },
                    (err) => {},
                    () => {
                        //this.load();
                    }
                );
        }

        const password = new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
        ]);
        const confirmPassword = new FormControl(
            '',
            CustomValidators.equalTo(password)
        );
        const coderesetcontrol = new FormControl(this.codereset);

        const iduser = new FormControl(0);

        this.changePasswordForm = new FormGroup({
            passwordWithoutEncryption: password,
            passwordConfirm: confirmPassword,
            id: iduser,
            codeBase64Url: coderesetcontrol,
        });
    }

    submit() {
        
    if (this.changewithcode){
        this.changePasswordForm.get('id').setValue( parseInt(this.userid.toString() ));
      }else{
        this.changePasswordForm.get('id').setValue(  this.getUser().id );
      }
  
      this.userService.resetpasswordPatch(this.changePasswordForm.value).subscribe(
        (data) => {
      debugger;
          if (data !== null && data !== undefined){
            
            if ( data.stateCode === 200){
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se cambió la contraseña correctamente',
                    life: 4000
                });
                setInterval(() => {
                    this.jwtAuth.signout();  
                }, 2000);
                clearInterval();
            }else{
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: data.messageError[0],
                    life: 4000
                });
            }
          }else{
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrio un error',
                life: 4000
            });
          }
  
        },
        (err) => {},
        () => {
          //this.load();
        }
      );
    }

    getUser() {
        return this.ls.getItem(this.APP_USER);
      }
}
