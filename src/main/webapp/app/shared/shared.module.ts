import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    MyAppSharedLibsModule,
    MyAppSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    UserTypeService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiSocialComponent,
    SocialService,
} from './';

@NgModule({
    imports: [
        MyAppSharedLibsModule,
        MyAppSharedCommonModule
    ],
    declarations: [
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        SocialService,
        UserService,
        UserTypeService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        MyAppSharedCommonModule,
        JhiSocialComponent,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MyAppSharedModule {}
