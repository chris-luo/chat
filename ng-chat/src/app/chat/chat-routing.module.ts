import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { ChatsComponent } from "./chats/chats.component";

const chatRoutes: Routes = [
    {
        path: '',
        component: ChatsComponent
    },
    {
        path: 'chat',
        component: ChatComponent
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