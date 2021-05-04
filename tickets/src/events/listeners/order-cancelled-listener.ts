import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@reapertickets/common';
import { queneGroupName } from './quene-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queneGroupName = queneGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message){
        //Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        //If no ticket, throw an error
        if(!ticket) {
            throw new Error('Ticket not found');
        }

        ticket.set({ orderId: undefined });
        await ticket.save();

        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            userId: ticket.userId,
            price: ticket.price,
            title: ticket.title,
            version: ticket.version,
        });

        msg.ack();
    };
};