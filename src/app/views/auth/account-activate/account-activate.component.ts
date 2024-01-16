import { MessageService } from 'primeng/api';
import { UserService } from './../../../data/service/user.service';
import { JwtAuthService } from './../../../shared/services/auth/jwt-auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-account-activate',
    templateUrl: 'account-activate.component.html',
    styleUrls: ['./account-activate.component.scss']
})

export class AccountActiveComponent implements OnInit {
    id: number;
    constructor(private route: ActivatedRoute,
      public jwtAuth: JwtAuthService,
      private userService: UserService, private messageService: MessageService) { }

    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            if (params) {
              this.id = params.get("id");
              this.userService.activateUser(this.id).subscribe(res => {
                  
              });
            }
          });
     }
}