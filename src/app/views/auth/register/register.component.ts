import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { Router } from '@angular/router';
import { UserService } from './../../../data/service/user.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {
    user: any;
    userForm: FormGroup;
    rutaHTMLCondiciones: SafeResourceUrl;
    rutaHTMLPoliticas: SafeResourceUrl;
    constructor(private userService: UserService,
                private router: Router,
                private messageService: MessageService,
                private jwtAuth: JwtAuthService,
                private modalService: BsModalService,
                public sanitizer: DomSanitizer) {
                    clearInterval();
                    this.rutaHTMLCondiciones = this.sanitizer.bypassSecurityTrustResourceUrl(environment.localhost + "assets/html/Condiciones.html");
                    this.rutaHTMLPoliticas = this.sanitizer.bypassSecurityTrustResourceUrl(environment.localhost + "assets/html/Politicas.html");
                 }

    ngOnInit() {
        const email = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.maxLength(50),
        ]);
        this.userForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            motherlastname: new FormControl('', Validators.required),
            email: email,
            passwordWithoutEncryption: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(12),
                Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}")
            ]),
          });
     }

    submit() {
      console.log(this.userForm.value);
      this.userService.add(this.userForm.value).subscribe(
          res => {
              if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Registro exitoso',
                    life: 4000
                });
                this.user = res.data;
              } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.messageError[0],
                    life: 4000
                });
              }
          }, err => {

          }, () => {
            setInterval(() => {
                this.router.navigateByUrl(`/auth/active-account/${this.user.email}`);
            }, 2000);
            clearInterval();
          }
      )
    }

    signin(username: string, password: string) {
        //   this.submitButton.disabled = true;
        //  this.progressBar.mode = 'indeterminate';
  
        this.jwtAuth.signin(username, password).subscribe(
            res => {
                if (res.stateCode == 200) {
                   console.log('entrooo');
                }
            });
    }

    openModal(template: TemplateRef<any>) {
    this.modalService.show(template, { class: 'modal-lg' });
    }

    cerrarModal(){
    this.modalService.hide();
    }
}