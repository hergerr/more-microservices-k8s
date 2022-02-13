import { Publisher, OrderCreatedEvent, Subjects } from "@tftickects/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
