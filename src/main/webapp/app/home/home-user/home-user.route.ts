import {Route, RouterModule} from '@angular/router';
import {HomeUserComponent} from './home-user.component';

export const route: Route = {
    path: '',
    component: HomeUserComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const ROUTES = RouterModule.forChild([route]);
