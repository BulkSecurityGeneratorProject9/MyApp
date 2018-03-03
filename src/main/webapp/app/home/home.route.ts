import {Routes} from '@angular/router';
import {HomeUserModule} from './home-user/home-user.module';
import {HomeAdminModule} from './home-admin/home-admin.module';

export const HOME_ROUTE: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => HomeUserModule
    },
    {
        path: 'admin',
        loadChildren: () => HomeAdminModule
    }
];
