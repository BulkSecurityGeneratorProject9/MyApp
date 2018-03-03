import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MyAppSharedModule} from '../../shared';
import {HomeUserComponent} from './home-user.component';
import {ROUTES} from './home-user.route';

@NgModule({
    imports: [
        MyAppSharedModule,
        ROUTES
    ],
    declarations: [HomeUserComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeUserModule {
}
