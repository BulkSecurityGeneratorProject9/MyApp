import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
    selector: 'jhi-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [
        'home-page.scss'
    ]
})
export class HomePageComponent implements OnInit {
    isLogin = true;
    email: string;
    password: string;

    constructor(router: Router) {
        router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                const tree = router.parseUrl(router.url);
                if (tree.fragment) {
                    this.isLogin = tree.fragment !== 'register';
                    const element = document.querySelector('#' + tree.fragment);
                    if (element) {
                        element.scrollIntoView(true);
                    }
                } else {
                    window.scrollTo(0, 0);
                }
            }
        });
    }

    ngOnInit() {
    }

    onChange() {
        this.isLogin = !this.isLogin;
        this.isLogin ? console.log('login...') : console.log('register...');
    }
}
