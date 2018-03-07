export class Message {
  constructor(
    public id: number,
    public body: string,
    public sender_id: number,
    public send_time: string,
    public read_status: number
  )
 {}
}
