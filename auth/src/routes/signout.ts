import express from 'express';

const router = express.Router();

router.post('/api/users/signout',(req,res)=>{
    req.session = null;

    res.send({message: 'You are Successfully Signed Out😎'})
});

export {router as signOutRouter};