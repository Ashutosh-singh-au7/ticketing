import { Publisher, OrderCreatedEvent, Subjects } from '@reapertickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject = Subjects.OrderCreated;
};