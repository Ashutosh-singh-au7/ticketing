import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex') ,{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log('Listener connected to nats');

    stan.on('close',()=>{
        console.log('Nats connection closed');
        process.exit();
    });

// 2nd argument in subscription is quenegroup.

    // const options = stan
    //     .subscriptionOptions()
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable()
    //     .setDurableName('accounting-service');

    // const subscription = stan.subscribe(
    //     'ticket:created', 
    //     'quene-group-name',
    //     options
    //     );

    // subscription.on('message',(msg: Message )=>{
    //     // console.log('Message Recieved');
    //     const data = msg.getData();

    //     if(typeof data === 'string') {
    //         console.log(`Received event #${msg.getSequence()},with data:  ${data}`);
    //     }
    //     msg.ack();
    // });
    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', ()=> stan.close());
process.on('SIGTERM', ()=> stan.close());


