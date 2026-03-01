//IMPORTNG DEPS
import express from 'express';
import cors from 'cors';

//IMPORTING ROUTERS
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoute';
import chatRouter from './routes/chatRoute';

//IMPORTING CUSTOM MIDDLEWARE
import errorHandlerMiddleware from './middleware/err-handler';
import notFound from './middleware/notfound-middleware';

const app = express();

//EXPRESS MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//UTLISING ROUTES
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/product/', productRouter);
app.use('/api/v1/chat/', chatRouter);

//CUSTOM MIDDLEWARE
app.use(errorHandlerMiddleware);
app.use(notFound);

export default app;
