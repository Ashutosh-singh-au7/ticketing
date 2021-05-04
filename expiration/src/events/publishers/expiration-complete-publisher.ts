import { Subjects, Publisher, ExpirationCompleteEvent } from '@reapertickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete
};