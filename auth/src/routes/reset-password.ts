import express,{Request,Response, Router} from 'express'
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import mailgun from 'mailgun-js';
import { BadRequestError } from '@reapertickets/common';

const router = express.Router();

const DOMAIN = process.env.MAILGUN_DOMAIN!;
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY! , domain: DOMAIN})

router.put('/api/users/resetpassword',(req:Request, res:Response)=>{
    const {resetLink, newPass} = req.body;
    if(resetLink){
        jwt.verify(resetLink,process.env.JWT_KEY!, (error:any,decodedData:any)=>{
            if(error){
                return res.status(401).json({
                    error: 'Incorrect Token or it is expired'
                })
            };
            User.findOne({resetLink},(err,user)=>{
                if(err || !user){
                    throw new BadRequestError("user with this token does not exist.")
                }
                const obj={
                    password: newPass
                };
                user =_.extend(user, obj);
                user.save((err,result)=>{
                    if(err){
                        return res.status(400).json({error: 'reset password link error'});
                    }else{
                        return res.status(200).json({message: 'Your password has been changed'})
                    }
                })
            })
        })
    }else{
        throw new BadRequestError('Authentication Error');
    }
});

export {router as resetPasswordRouter};