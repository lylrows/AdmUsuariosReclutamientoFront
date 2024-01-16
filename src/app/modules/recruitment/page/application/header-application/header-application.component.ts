import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-application',
  templateUrl: './header-application.component.html',
  styleUrls: ['./header-application.component.scss']
})
export class HeaderApplicationComponent implements OnInit {

  @Input('state') state: any;

  constructor() { }

  ngOnInit(): void {
  }

}
