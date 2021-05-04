import express from 'express';
import { currentUser } from '@reapertickets/common';

const router = express.Router();

router.get('/api/users/currentuser',currentUser,(req,res)=>{
    //we can write !req.session || !req.session.jwt === !req.session?.jwt both are similar
    // if(!req.session?.jwt){
    //     return res.send({
    //         message: 'You are not loggedIn 🧐',
    //         currentUser: null
    //     });
    // }
    res.send({
        currentUser: req.currentUser || null
    });
});

export { router as currentUserRouter };