import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChatRoutingModule } from "./chat-routing.module";
import { MaterialModule } from "../shared/material.module";
import { ChatComponent } from "./chat.component";

@NgModule({
    declarations: [ChatComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChatRoutingModule
    ]
})

export class ChatModule {}