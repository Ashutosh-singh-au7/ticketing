import { Publisher, Subjects, TicketCreatedEvent } from '@reapertickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

};


