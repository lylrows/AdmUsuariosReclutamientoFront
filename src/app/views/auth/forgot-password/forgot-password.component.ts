import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { UserService } from './../../../data/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    errorMsg='';

    constructor(private userService: UserService,
                public jwtAuth: JwtAuthService,
                private messageService: MessageService) {
                    clearInterval();
                }

    ngOnInit() {
        const email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
        ]);

        this.forgotPasswordForm = new FormGroup({
            email: email,
        });
    }

    submit() {
        this.userService
            .sendResetPasswordCode(this.forgotPasswordForm.value)
            .subscribe(
                (response) => {
                    //this.router.navigateByUrl(this.jwtAuth.return);
                    if (response.stateCode === 200) {
                        this.messageService.add({severity:'success', summary:'Success', detail:response.messageError[0]});
                        setInterval(() => {
                            this.jwtAuth.signout();  
                        }, 2500);
                        clearInterval();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: response.messageError[0],
                            life: 4000
                        });
                    }

                  /*  this.progressBar.mode = 'determinate';
                    this.submitButton.disabled = false;*/
                },
                (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err.message,
                        life: 4000
                    });
                }
            );
    }

    onReject() {
        this.messageService.clear('c');
    }

    onConfirm() {
        this.messageService.clear('c');
        this.jwtAuth.signout();
    }
}
