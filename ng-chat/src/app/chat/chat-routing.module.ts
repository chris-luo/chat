import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { ChatsComponent } from "./chats/chats.component";
import { NewChatComponent } from "./new-chat/new-chat.component";

const chatRoutes: Routes = [
    {
        path: '',
        component: ChatsComponent
    },
    {
        path: 'chat',
        component: ChatComponent
    },
    {
        path: 'new-chat',
        component: NewChatComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(chatRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ChatRoutingModule {}