import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ChatRoutingModule } from "./chat-routing.module";
import { MaterialModule } from "../shared/material.module";
import { ChatComponent } from "./chat.component";
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputComponent } from './chat-input/chat-input.component';

@NgModule({
    declarations: [ChatComponent, ChatWindowComponent, ChatMessageComponent, ChatInputComponent],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChatRoutingModule
    ]
})

export class ChatModule {}