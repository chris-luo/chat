import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { MaterialModule } from "../shared/material.module";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ]
})

export class AuthModule {

}