import {Component, OnInit, HostListener, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiLanguageService} from 'ng-jhipster';
import {ProfileService} from '../profiles/profile.service';
import {JhiLanguageHelper, Principal, LoginModalService, LoginService} from '../../shared';

import {VERSION} from '../../app.constants';
import {UserTypeService} from '../../shared/user/userType.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})

export class NavbarComponent implements OnInit, OnDestroy {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    isScrolled = false;
    currPos: Number = 0;
    changePos: Number = 100;

    userType: string;
    userTypeSubscribe: any;

    constructor(private loginService: LoginService,
                private languageService: JhiLanguageService,
                private languageHelper: JhiLanguageHelper,
                private principal: Principal,
                private loginModalService: LoginModalService,
                private userTypeService: UserTypeService,
                private profileService: ProfileService,
                private cdr: ChangeDetectorRef,
                private router: Router) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        // this.profileService.getProfileInfo().then((profileInfo) => {
        //     this.inProduction = profileInfo.inProduction;
        //     this.swaggerEnabled = profileInfo.swaggerEnabled;
        // });

        this.userTypeSubscribe = this.userTypeService.getType().subscribe((type) => {
           this.userType = type;
           this.cdr.detectChanges();
        });
    }

    @HostListener('window:scroll', ['$event.target'])
    onScroll(target) {
        this.currPos = (window.pageYOffset || target.scrollTop) - (target.clientTop || 0);
        this.isScrolled = this.currPos >= this.changePos;
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }

    ngOnDestroy() {
        if (this.userTypeSubscribe) {
            this.userTypeSubscribe.unsubscribe();
        }
    }
}
