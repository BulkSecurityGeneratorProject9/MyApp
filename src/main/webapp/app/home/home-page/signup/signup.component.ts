import {Component, OnInit, Renderer, ElementRef, Output, EventEmitter} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {JhiLanguageService} from 'ng-jhipster';
import {StateStorageService} from '../../../shared/auth/state-storage.service';
import {Register} from '../../../account/register/register.service';
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from '../../../shared';
import {Router} from '@angular/router';
import {UserTypeService} from '../../../shared/user/userType.service';

@Component({
    selector: 'jhi-signup',
    templateUrl: './signup.component.html',
    styleUrls: [
        '../../../../content/scss/styles.scss'
    ]
})
export class SignupComponent implements OnInit {
    @Output() close = new EventEmitter<boolean>();
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;

    constructor(private languageService: JhiLanguageService,
                private registerService: Register,
                private stateStorageService: StateStorageService,
                private userTypeService: UserTypeService,
                private elementRef: ElementRef,
                private renderer: Renderer,
                private router: Router) {
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;
                }, (response) => this.processError(response));
            });
        }
    }

    openLogin() {
        this.close.emit(true);
    }

    guest() {
        this.userTypeService.setType('guest');
        this.router.navigate(['/user']);
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
