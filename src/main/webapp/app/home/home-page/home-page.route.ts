import {Route, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page.component';

export const route: Route = {
    path: '',
    component: HomePageComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const ROUTES = RouterModule.forChild([route]);
