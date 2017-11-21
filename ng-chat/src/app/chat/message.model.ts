export class Message {
  constructor(public user: {
      id: number,
      email: string,
      username: string
    },
    public message: {
      text: string,
      float: string
    }) {}
}
