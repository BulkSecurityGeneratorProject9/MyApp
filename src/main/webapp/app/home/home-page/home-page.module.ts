import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageComponent} from "./home-page.component";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
    imports: [
        CommonModule,
        HomePageComponent,
        SigninComponent,
        SignupComponent
    ],
    declarations: []
})
export class HomePageModule {
}
