import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MyAppSharedModule} from '../../shared';
import {HomeAdminComponent} from './home-admin.component';
import {ROUTES} from "./home-admin.route";

@NgModule({
    imports: [
        MyAppSharedModule,
        ROUTES
    ],
    declarations: [HomeAdminComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeAdminModule {

}
