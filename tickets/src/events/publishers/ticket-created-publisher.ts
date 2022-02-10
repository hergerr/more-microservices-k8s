import { Publisher, Subjects, TicketCreatedEvent } from "@tftickects/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
