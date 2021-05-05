import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors'
import cors from 'cors';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signUpRouter } from './routes/signup';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@reapertickets/common';
import { forgotPasswordRouter } from './routes/forgot-password';
import {resetPasswordRouter } from './routes/reset-password';
// import { otpVerificationRouter } from './routes/otp-verification';
// import { otpVerifyRouter } from './routes/otp-verify';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors({origin:'https://ticketing.dev/',credentials: true}));
app.use(cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(forgotPasswordRouter);
app.use(resetPasswordRouter);
// app.use(otpVerificationRouter);
// app.use(otpVerifyRouter);

app.all('*',async (req,res)=>{
    throw new NotFoundError();

});

app.use(errorHandler);

export { app };
