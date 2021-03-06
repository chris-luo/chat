import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { chatReducer } from "./store/chat.reducers";
import { ChatEffects } from './store/chat.effects';

import { ChatRoutingModule } from "./chat-routing.module";
import { MaterialModule } from "../shared/material.module";
import { ChatComponent } from "./chat.component";
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatsComponent } from './chats/chats.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { ChatService } from "./chat.service";
import { ChatDatePipe } from './chat-date.pipe';

@NgModule({
    declarations: [
        ChatComponent, 
        ChatWindowComponent, 
        ChatMessageComponent, 
        ChatInputComponent, 
        ChatsComponent, 
        NewChatComponent,
        ChatDatePipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ChatRoutingModule,
        StoreModule.forFeature('chat', chatReducer),
        EffectsModule.forFeature([ChatEffects])
    ],
    providers: [ChatService]
})

export class ChatModule {}