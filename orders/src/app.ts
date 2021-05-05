import express from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors'
import cors from 'cors';
import {json} from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@reapertickets/common';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors({origin:'https://ticketing.dev/',credentials: true}));
app.use(cookieSession({
        signed: false,
        secure: false
    })
);

app.use(currentUser);

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);


app.all('*',async (req,res)=>{
    throw new NotFoundError();

});

app.use(errorHandler);

export { app };
