import { Listener, Subjects, OrderCreatedEvent } from '@reapertickets/common';
import { queneGroupName } from './quene-group-name';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queneGroupName = queneGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message){

        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        // console.log('Waiting this many miliseconds to process the job:', delay)
        
        await expirationQueue.add({
            orderId: data.id
        },
        {
            delay: delay
        }
    );

        msg.ack();
    };
};