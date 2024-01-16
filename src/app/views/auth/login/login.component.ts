import { environment } from './../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login-postulant',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    signinForm: FormGroup;
    errorMsg = '';
    constructor(
        private jwtAuth: JwtAuthService,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
    ) {
      localStorage.clear();
      this.clear();
    }

    ngOnInit() {
        localStorage.setItem('islogin', 'true');
        const email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
        ]);
        this.signinForm = new FormGroup({
            username: email,
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(true),
        });
    }

    signin() {
        let storage = sessionStorage.getItem('job');
        const signinData = this.signinForm.value;

        //   this.submitButton.disabled = true;
        //  this.progressBar.mode = 'indeterminate';

        this.jwtAuth.signin(signinData.username, signinData.password).subscribe(
            (response) => {
                //this.router.navigateByUrl(this.jwtAuth.return);

                if (response.data) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Ingreso exitoso',
                        life: 4000,
                    });
                    http://localhost:4200/#/auth/login
                    // setInterval(() => {
                    //     if (storage != null) {
                    //         window.location.href = `${environment.localhost}#/recruitment/job-detail/${storage}`;
                    //     } else {
                    //         //this.router.navigateByUrl('/recruitment/home');
                    //         window.location.href =  `${environment.localhost}#/recruitment/home`;
                    //     }
                    // }, 2000);
                    
                    setTimeout(() => {
                        if (storage != null) {
                            // window.location.href = `${environment.localhost}#/recruitment/job-detail/${storage}`;
                            window.location.href = `${environment.localhost}#/recruitment/job-detail`;
                        } else {
                            //this.router.navigateByUrl('/recruitment/home');
                            window.location.href =  `${environment.localhost}#/recruitment/home`;
                        }
                    }, 2000);
                    localStorage.removeItem('job');
                } else {
                    console.log('entrooo');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: response.messageError[0],
                        life: 4000,
                    });
                }
                //    this.progressBar.mode = 'determinate';
                //    this.submitButton.disabled = false;
            },
            (err) => {
                //     this.submitButton.disabled = false;
                //    this.progressBar.mode = 'determinate';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message,
                    life: 4000,
                });

                // console.log(err);
            }
        );
    }

    clear() {
      const interval_id = window.setInterval(function () {},
      Number.MAX_SAFE_INTEGER);

      // Clear any timeout/interval up to that id
      for (let i = 1; i < interval_id; i++) {
          window.clearInterval(i);
      }
    }
}
