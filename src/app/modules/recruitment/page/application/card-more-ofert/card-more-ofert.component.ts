import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-more-ofert',
  templateUrl: './card-more-ofert.component.html',
  styleUrls: ['./card-more-ofert.component.scss']
})
export class CardMoreOfertComponent implements OnInit {

  @Input('itm') itm: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(id: any){
    sessionStorage.setItem('job', id);
    this.router.navigateByUrl('/recruitment/job-detail');
  }

}
