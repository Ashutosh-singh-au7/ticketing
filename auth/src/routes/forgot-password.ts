require('dotenv').config();
import express,{Request,Response} from 'express'
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import mailgun from 'mailgun-js';
import { BadRequestError } from '@reapertickets/common';

const router = express.Router();

const DOMAIN = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY! , domain: DOMAIN})


router.put('/api/users/forgotpassword',async (req: Request, res: Response) => {
    const {email} = req.body;

    const existingUser = await User.findOne({ email});
    if(!existingUser){
        throw new BadRequestError('User with this Email does not Exists.');
    };
    const userJwt = jwt.sign({ 
        id: existingUser.id,
        email: existingUser.email
    },process.env.JWT_KEY!,{expiresIn: '20m'});

    //store it on session object
    // req.session = { 
    //     jwt: userJwt
    // };

    const data = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'Password Reset Link ',
        html:`
                <h2>Please click on given link to reset your password 😎</h2>
                <a>https://ticketing.dev/auth/verifyPassword?resetLink=${userJwt}</a>
        `
    };


    return existingUser.updateOne({resetLink: userJwt},(err,success)=>{
        if(err){
            throw new BadRequestError('Reset password link error')
        }else{
            
            mg.messages().send(data, function (error, body) {
                if(error){
                    return res.json({
                        message: error.message
                    })
                }
                console.log(data);
                return res.send({message: 'Email has been sent, kindly follow the instruction 😇'})
            });
        }
    });
});

export { router as forgotPasswordRouter };