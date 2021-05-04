import express,{Request,Response} from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@reapertickets/common';

const router = express.Router();

router.post('/api/users/signin',
[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('you must supply a password')
],
validateRequest,
async(req: Request,res:Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if(!existingUser){
        throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch){
        throw new BadRequestError('Invalid credentials');
    };
    //Generate JWT
    const userJwt =jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.JWT_KEY!
    );

    //STORE IT ON SESSION OBJECT
        req.session={
            jwt: userJwt
        };

        res.status(200).send({
            message: 'You are succesfully SignedIn 😇',
            data: existingUser
        });
});

export {router as signInRouter};