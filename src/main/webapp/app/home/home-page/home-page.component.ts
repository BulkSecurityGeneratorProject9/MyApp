import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

    onChange() {
        this.isLogin = !this.isLogin;
        this.isLogin ? console.log('login...') : console.log('register...');
    }
}
