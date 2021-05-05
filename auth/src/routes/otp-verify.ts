// require('dotenv').config();

// import express,{Request,Response} from 'express';
// import crypto from 'crypto';
// import jwt from 'jsonwebtoken';

// const smsKey = process.env.SMS_SECRET_KEY;

// const router = express.Router();


// router.post('/api/users/verifyotp',(req:Request, res:Response)=>{
//     const phone = req.body.phone;
//     const hash = req.body.hash;
//     const otp = req.body.otp;

//     const ttl = 2*60*1000;

//     let [hashValue, expires=Date.now() +ttl ] = hash.split('.');
//     let now = Date.now();
//     if(now > parseInt(expires)){
//         return res.status(504).send({ 
//             message: `TimeOut Please Try Again 😣`
//         });
//     };

//     const data =`${phone}.${otp}.${expires}`;
//     const newCalculatedHash = crypto.createHmac('sha256', smsKey!).update(data).digest('hex');

//     if(newCalculatedHash === hashValue){
//         const userJwt = jwt.sign({ 
//                 data:phone
//         },process.env.JWT_KEY!,{expiresIn: '20m'});

            
//         //store it on session object
//         req.session = { 
//             jwt: userJwt,
//         };
//         return res.status(202).send({
//             message: `User Confirmed and Device Verified 😍`
//         })
        
//     }else{
//         res.status(400).send({
//             verification: false,
//             message: `Verification Failed Incorrect OTP 😒`
//         })
//     }
// });

// export {router as otpVerifyRouter};