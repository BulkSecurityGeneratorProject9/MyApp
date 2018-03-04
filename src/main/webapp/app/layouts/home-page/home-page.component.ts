import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jhi-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [
        'home-page.scss'
    ]
})
export class HomePageComponent implements OnInit {

    email: string;
    password: string;

    constructor() {
    }

    ngOnInit() {
    }
}
