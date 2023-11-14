import express from 'express';

import apiRoutes from './routes/api.routes';
import connectDB from './config/db.connection';
import errorHandler from './middlewares/error.handler.middleware';
import logger from './logger';
import { httpLogger } from './middlewares/logger.middlewares';
import { validatePath } from './middlewares/validators';
import { addAuthUserMiddleware } from './middlewares/apps/auth/auth.middlewares';

const port = process.env.NODE_PORT || 3000;

const app = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// logging each request
app.use(httpLogger);

// auth middlewares

app.use(addAuthUserMiddleware);

// routes
app.use('/api', apiRoutes);

// error handlers
app.use('*', validatePath);
app.use(errorHandler);

// server

const runApp = async () => {
    await connectDB();
    app.listen(port, () => {
        logger.info(`Server started listening on port ${port}`);
    });
};

export default runApp;
