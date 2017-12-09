import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './home/home.component';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';
import { AuthInterceptor } from '../shared/auth.interceptor';

@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule
    ],
    exports: [      
        NavbarComponent,
        AppRoutingModule,
        MaterialModule
    ],
    providers: [
        AuthService,
        ApiService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ]
})

export class CoreModule {}