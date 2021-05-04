import { Subjects, Publisher, PaymentCreatedEvent } from '@reapertickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    readonly subject = Subjects.PaymentCreated;
};