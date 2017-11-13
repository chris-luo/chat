import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent
    ],
    imports: [
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    exports: [
        FormsModule,        
        NavbarComponent,
        AppRoutingModule,
        MaterialModule
    ]
})

export class CoreModule {}