import { Message } from 'node-nats-streaming';
import { queneGroupName } from './quene-group-name';
import { Order } from '../../models/order';
import { Listener, Subjects, PaymentCreatedEvent, OrderStatus } from '@reapertickets/common';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
    queneGroupName = queneGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message){
        const order = await Order.findById(data.orderId);

        if(!order) {
            throw new Error('Order not found');
        }

        order.set({ 
            status: OrderStatus.Complete
        });
        await order.save();
        
        msg.ack();
    }
}