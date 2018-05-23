import {Component, AfterViewInit, Renderer, ElementRef, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {JhiEventManager} from 'ng-jhipster';
import {LoginService} from '../../../shared/login/login.service';
import {StateStorageService} from '../../../shared/auth/state-storage.service';
import {UserTypeService} from '../../../shared/user/userType.service';
import {
    Trie,
    EMAIL_PROVIDERS,
    PATTERN_DOMAIN,
    PATTERN_NAME,
    KEYCODE_PROTECTED,
    EMAIL_VERIFY_API_KEY,
    EMAIL_VERIFY_API_URL
} from '../../../shared';
//Errors
const INVALID_EMAIL = 'Invalid email';
const INVALID_DOMAIN = 'Invalid domain';
const ERR_NOT_EMPTY = 'cannot be empty';
const ERR_MISSING_AT = 'missing "@"';
const ERR_MISSING_DOT = 'missing "."';
const ERR_MISSING_NAME = 'missing name';
const ERR_IS_TYPO = 'is it a typo?';

@Component({
    selector: 'jhi-signin',
    templateUrl: './signin.component.html',
    styleUrls: [
        '../../../../content/scss/styles.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class SigninComponent implements AfterViewInit {
    @Output() close = new EventEmitter<boolean>();

    authenticationError: boolean;
    password: string;
    rememberMe = true;
    email: string;
    credentials: any;
    error: string;
    validate = false;
    dict = new Trie(); //auto-complete emails dict. trie
    len = null; //input string length

    constructor(private eventManager: JhiEventManager,
                private loginService: LoginService,
                private stateStorageService: StateStorageService,
                private userTypeService: UserTypeService,
                private elementRef: ElementRef,
                private renderer: Renderer,
                private router: Router) {
        this.credentials = {};
        EMAIL_PROVIDERS.forEach(email => this.dict.add(email));
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    cancel() {
        this.credentials = {
            email: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService.login({
            email: this.email,
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

    guest() {
        this.userTypeService.setType('guest');
        this.router.navigate(['/user']);
    }

    handleChange(e) {
        console.log('input change...');
        this.email = e.target.value;
        this.validate = false;
        this.error = '';
    }

    handleSubmit(e) {
        console.log('submit...');
        e.preventDefault();
        // this.email = e.target.value; //for test
        if (this.validation() && this.deliverable()) {
            this.error = '';
            this.validate = true;
        }
    }

    handleKeyPress(e) {
        let keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        console.log('key press... ' + keyCode);
        if (KEYCODE_PROTECTED.indexOf(keyCode) >= 0) return;
        let target = e.target;
        this.len = target.value.length;
        let start = target.selectionStart;
        let end = target.selectionEnd;
        let atPos = target.value.indexOf('@');
        if (atPos < 0 && keyCode !== 64) return; //@=64
        let prefix = target.value.substring(atPos + 1, start) + String.fromCharCode(keyCode);
        if (keyCode === 64) prefix = '';
        e.preventDefault();
        //keycode for end
        if (/^(13|44|59)$/.test('' + keyCode)) {
            e.target.selectionStart = end + (target.value.length - this.len);
            e.target.selectionEnd = end + (target.value.length - this.len);
            if (this.validation() && this.deliverable()) {
                this.error = '';
                this.validate = true;
            }
            return;
        }
        //replace selection with input
        e.target.value = target.value.substr(0, start) + String.fromCharCode(keyCode) + target.value.substr(end, target.value.length);
        this.len = target.value.length - this.len;
        //move selection
        e.target.selectionStart = ++start;
        e.target.selectionEnd = end + this.len;
        //matched domain
        let words = [];
        if (keyCode === 64) words = this.dict.getWords();
        else words = this.dict.getWordsByPrefix(prefix);
        //auto complete
        if (words.length > 0) {
            let subStr = words[0].substr(prefix.length, words[0].length);
            e.target.value = target.value.substr(0, start) + subStr + target.value.substr(start, target.value.length);
            //highlight
            e.target.selectionStart = start;
            e.target.selectionEnd = start + subStr.length;
        }
        this.email = e.target.value;
    }

    onFocusOut(e) {
        if (this.validation() && this.deliverable()) {
            this.error = '';
            this.validate = true;
        }
    }

    validation() {
        let email = this.email;
        console.log('validate: ' + email);
        if (!email) return this.setError(ERR_NOT_EMPTY);
        if (typeof email !== undefined) {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');
            if (lastAtPos < 0) return this.setError(ERR_MISSING_AT);
            let domainPart = email.substr(lastAtPos + 1);
            let domainRegExp = new RegExp(PATTERN_DOMAIN);
            if (!domainRegExp.test(domainPart)) return this.setError(INVALID_DOMAIN);
            if (lastDotPos < lastAtPos) return this.setError(ERR_MISSING_DOT);
            let namePart = email.substr(0, lastAtPos);
            let nameRegExp = new RegExp(PATTERN_NAME);
            if (namePart.length === 0) return this.setError(ERR_MISSING_NAME);
            if (!nameRegExp.test(namePart)) return this.setError(ERR_IS_TYPO);
        }
        return true;
    }

    deliverable() {
        console.log('deliverable: ' + this.email);
        let url = EMAIL_VERIFY_API_URL + '?email=' + encodeURI(this.email) + '&apikey=' + EMAIL_VERIFY_API_KEY;
        //using mode: "no-cors" will get an opaque response, which doesn't seem to return data in the body.
        // fetch(url, {method: 'GET', mode: 'no-cors', headers: {Accept: 'application/json'}})
        //     .then(res => {
        //         console.log(res);
        //         if (res.status === 200) return res.json();
        //     })
        //     .then(json => {
        //         /**do something**/
        //         console.log('You are using Kickbox\'s sandbox API: all email => 'result':'deliverable'');
        //     })
        //     .catch(error => console.error('Error:', error));
        return true;
    }

    setError(msg) {
        console.log(msg);
        this.error = INVALID_EMAIL + ': ' + msg;
        return false;
    }
}
