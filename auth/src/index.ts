import mongoose from 'mongoose';
import { app } from './app';

const start = async ()=>{
    console.log('Starting up Auth....')
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('Connected to Database Successfully');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000,()=>{
        console.log('Listening on port 3000!!!!!!') 
    });
};

start();
