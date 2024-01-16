import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-recruitment',
  templateUrl: './card-recruitment.component.html',
  styleUrls: ['./card-recruitment.component.scss']
})
export class CardRecruitmentComponent implements OnInit {

  img: string;

  @Input('item') item: any;
  @Input() events: Observable<void>;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
 

  navigate(id: any){
    sessionStorage.setItem('job', id);
    this.router.navigateByUrl('/recruitment/job-detail');
  }
}
