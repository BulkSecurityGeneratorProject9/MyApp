import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MyAppSharedModule} from '../../shared';
import {ROUTES} from './home-page.route';
import {HomePageComponent} from './home-page.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';

@NgModule({
    imports: [
        MyAppSharedModule,
        ROUTES
    ],
    declarations: [HomePageComponent,
        SigninComponent,
        SignupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePageModule {
}
