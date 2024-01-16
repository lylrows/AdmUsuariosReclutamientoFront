import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InformationPostulantEventService } from './../../../modules/recruitment/page/configuration/information-postulant/information-postulant-event.service';
import { UserService } from './../../../data/service/user.service';
import { Component, OnInit, Input} from '@angular/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { LocalStoreService } from '../../services/local-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.scss']
})
export class HeaderSideComponent implements OnInit {
  @Input() showMenu: boolean = true;
  constructor(private ls: LocalStoreService,
    public jwtAuth: JwtAuthService, private eventService: InformationPostulantEventService, private router: Router) {

    }
  APP_USER = "USER";
  isLogged=false;
  fullnameuser="";
  showPerfil: boolean = false;
  img: string = "";
  event: Subscription;
  user;
  ngOnInit(): void {
    this.event = this.eventService.saveimg$.subscribe(res => {
         console.log('entroooo');
         console.log('res nueva imagen', res);
         this.user = this.getUser();
         this.user.img = res;
         this.img = res;
         this.ls.setItem(this.APP_USER, this.user)
    })

    if(this.getUser() !== null  && this.getUser() !== undefined ){
      this.isLogged=true;
      this.fullnameuser= this.getUser().displayName;
      this.img = this.getUser().img;
    }
  }

  account() {
     this.router.navigate(['/recruitment/account']);
  }

  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

}
