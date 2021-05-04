require('dotenv').config();

import express,{Request,Response} from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'

const router = express.Router();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const smsKey = process.env.SMS_SECRET_KEY;

router.post('/api/users/sendotp',(req:Request, res:Response)=>{
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 2*60*1000;
    const expires = Date.now() +ttl;
    const data =`${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey!).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;
    

    client.messages.create({
        body: `Your one time login password for Ashutosh singh TicketingEcommerce is ${otp}`,
        from: +15123991133,
        to: phone
    }).then((messages:any)=>{
        console.log(messages);
        
    }).catch((err:any)=>{
        console.error(err);
    })
    // const userJwt =jwt.sign({
    //     id: existingUser.id,
    //     email: existingUser.email
    // },
    //     process.env.JWT_KEY!
    // );

    //STORE IT ON SESSION OBJECT
        req.session={
            jwt: fullHash
        };
    res.status(200).send({
        message: 'OTP send successfully 😘' ,phone, hash:fullHash, otp
    });
});

export { router as otpVerificationRouter };