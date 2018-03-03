import {Route, RouterModule} from '@angular/router';
import {HomeAdminComponent} from './home-admin.component';

export const route: Route = {
    path: '',
    component: HomeAdminComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const ROUTES = RouterModule.forChild([route]);
