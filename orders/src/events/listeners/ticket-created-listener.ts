import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@reapertickets/common';
import { Ticket } from '../../models/ticket';
import { queneGroupName } from './quene-group-name';


export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queneGroupName = queneGroupName;

    async onMessage(data: TicketCreatedEvent['data'], msg: Message){
        const { id,title,price } = data;
        const ticket = Ticket.build({
            id,title,price
        });

        await ticket.save();

        msg.ack();
    }
};