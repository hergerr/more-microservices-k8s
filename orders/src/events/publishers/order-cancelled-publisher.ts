import { Publisher, OrderCancelledEvent, Subjects } from "@tftickects/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
