import { Message } from './message.model';
import { User } from '../shared/user.model';

export class Chat {
    constructor(public id: string, public users: User[], public messages: Message[]) {}
}