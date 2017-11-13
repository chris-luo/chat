import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingModule
    ]
})

export class AuthModule {

}