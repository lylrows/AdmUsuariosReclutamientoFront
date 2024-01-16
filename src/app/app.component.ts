import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { filter } from 'rxjs/operators';
import { createMask } from '@ngneat/input-mask';
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        Location, {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ]
})
export class AppComponent implements OnInit {
    location: any;
    routerSubscription: any;

    constructor(private router: Router) {
    }


    ngOnInit(){
        this.recallJsFuntions();
    }
 

    recallJsFuntions() {
        // this.router.events
        // .subscribe((event) => {
        //     if ( event instanceof NavigationStart ) {
        //         $('.loader').fadeIn('slow');
        //     }
        // });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                $('.loader').fadeIn('slow');
            } else if (ev instanceof NavigationEnd) {
                setTimeout(() => {window.scrollTo(0, 0)}, 150);
            }
        });

        this.routerSubscription = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
        .subscribe(event => {
            $("div.mean-bar").remove();
            $.getScript('../assets/js/custom.js');
            $('.loader').fadeOut('slow');
            this.location = this.router.url;
            if (!(event instanceof NavigationEnd)) {
                return;
            }
            //window.scrollTo(0, 0);
        });
    }
}