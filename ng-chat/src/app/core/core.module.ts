import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    exports: [
        NavbarComponent,
        FormsModule,
        MaterialModule
        // AppRoutingModule
    ]
})

export class CoreModule {}