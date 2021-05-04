import { Publisher, OrderCancelledEvent, Subjects } from '@reapertickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
};