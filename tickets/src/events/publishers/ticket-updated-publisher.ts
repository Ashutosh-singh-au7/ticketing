import { Publisher, Subjects, TicketUpdatedEvent } from '@reapertickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
};


