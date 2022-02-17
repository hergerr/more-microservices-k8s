import { Listener, OrderCreatedEvent, Subjects } from "@tftickects/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // adding job for bull queue (expiration)
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: 10000,
      }
    );

    msg.ack();
  }
}
