import { Message } from './message.model';
import { User } from '../shared/user.model';

export class Chat {
    constructor(public id: number, public users: string[], public messages: Message[]) {}
}