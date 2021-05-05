import express,{ Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import mailgun from 'mailgun-js';
import { validateRequest, BadRequestError } from '@reapertickets/common';

const router = express.Router();

// const DOMAIN = 'sandboxd836eba6712a4627830d33aaef4e07ec.mailgun.org';
// const mg = mailgun({apiKey: 'cedfc18de9adc23b7a8c98ec2250f5d4-71b35d7e-7dd2c8fe' , domain: DOMAIN})

router.post('/api/users/signup',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({min:4, max:20})
        .withMessage('Password must be between 4 and 20 characters')
],
validateRequest,
async(req: Request, res: Response) => {
    const { email, password } =  req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new BadRequestError('Email in use')
    };

    const user = User.build({ email,password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({ 
        id: user.id,
        email: user.email
    },process.env.JWT_KEY!);

    //store it on session object
    req.session = { 
        jwt: userJwt
    };

    // const data = {
    //     from: 'noreply@hello.com',
    //     to: email,
    //     subject: 'Account Activation Link ',
    //     html:`
    //         <h2>Please click on given link to activate your account 😎</h2>
    //         <a>https://ticketing.dev/authentication/activate/${userJwt}</a>
    //     `
    // };
    // mg.messages().send(data, function (error, body) {
    //     if(error){
    //         return res.send({
    //             message: error.message
    //         })
    //     }
    //     return res.send({message: 'Email has been sent, kindly activate your account'})
    // });

    res.status(201).send({
        message: 'You are Successfully SignedUp 🥳',
        data: user
    });
});

export { router as signUpRouter};
