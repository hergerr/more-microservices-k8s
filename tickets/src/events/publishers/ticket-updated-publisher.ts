import { Publisher, Subjects, TicketUpdatedEvent } from "@tftickects/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
