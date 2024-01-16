import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../data/service/user.service';
import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-activate-account',
    templateUrl: 'activate-account.component.html',
    styleUrls: ['activate-account.component.scss']
})

export class ActivateAccountComponent implements OnInit {
    user: any;
    email: string;
    constructor(private route: ActivatedRoute,private jwtAuth: JwtAuthService, private userService: UserService, private messageService: MessageService) {
        this.clear();
        this.user = this.jwtAuth.getUser();
     }

    ngOnInit() { 
        this.route.paramMap.subscribe((params: any) => {
            if (params) {
              this.email = params.get("email");
            }
          });
    }

    sendMailRetrieve() {
      this.userService.sendMailActivation(this.email).subscribe(
          res => {
              if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Se envio el mensaje correctamente',
                    life: 4000
                });
              } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.messageError[0],
                    life: 4000
                });
              }
          }
      )
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