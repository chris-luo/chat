import { NgModule } from "@angular/core";
import { MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
    ],
    exports: [
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
    ]
})

export class MaterialModule {}