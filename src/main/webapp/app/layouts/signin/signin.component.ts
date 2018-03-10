import {Component, AfterViewInit, Renderer, ElementRef, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {JhiEventManager} from 'ng-jhipster';

import {LoginService} from '../../shared/login/login.service';
import {StateStorageService} from '../../shared/auth/state-storage.service';

@Component({
    selector: 'jhi-signin',
    templateUrl: './signin.component.html',
    styleUrls: [
        '../../../content/scss/styles.scss'
    ]
})
export class SigninComponent implements AfterViewInit {
    @Output() close = new EventEmitter<boolean>();
    authenticationError: boolean;
    password: string;
    rememberMe = true;
    username: string;
    credentials: any;

    constructor(private eventManager: JhiEventManager,
                private loginService: LoginService,
                private stateStorageService: StateStorageService,
                private elementRef: ElementRef,
                private renderer: Renderer,
                private router: Router) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.authenticationError = false;
            if (this.router.url === '/register' || (/^\/activate\//.test(this.router.url)) ||
                (/^\/reset\//.test(this.router.url))) {
                this.router.navigate(['']);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            const redirect = this.stateStorageService.getUrl();
            if (redirect) {
                this.stateStorageService.storeUrl(null);
                this.router.navigate([redirect]);
            }
        }).catch(() => {
            this.authenticationError = true;
        });
    }

    register() {
        this.close.emit(true);
    }

    requestResetPassword() {
        // this.router.navigate(['/reset', 'request']);
    }

}
