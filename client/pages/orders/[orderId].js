import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) =>{
    // console.log(order);
    const [timeLeft, setTimeLeft] = useState(0);
    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body:{
            orderId: order.id
        },
        onSuccess: (payment) => Router.push('/orders')
    });

    useEffect(() =>{
        const findTimeLeft = () =>{
            // const dateNow = new Date(new Date().toLocaleString('en-US',{ timeZone: 'UTC'}));
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft,1000);
        
        return()=>{
            clearInterval(timerId);
        };
    },[order]);

    if(timeLeft < 0){
        return (
            <div>
                <h2>Sorry Order Expired!! 😇</h2>
            </div>
        )
    }
    

    return (
        <div>
            <h3>{ timeLeft } Seconds until order expires Hurry Up 🧐</h3>
            <StripeCheckout
                token = {({ id })=> doRequest({ token: id })}
                stripeKey = "pk_test_51ImZWMSFz7xjqu9Eb9U1fBGCKsnWMEs4bBOOCDgnFepl0rH0l3HHeXS0DZ2uKEBFapu5dmoc7WIk4JKwycoISf4m00Ga15sCdx"
                amount = {order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors}
        </div>
    );
};

OrderShow.getInitialProps = async(context, client) =>{
    const { orderId } = context.query;
    console.log(orderId);
    const { data} = await client.get(`/api/orders/${orderId}`);
    return { order: data  }
};

export default OrderShow;