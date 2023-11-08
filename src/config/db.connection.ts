import mongoose from 'mongoose';
import logger from '../logger';

const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/codeman';

const connectDB = async () => {
    try {
        logger.info(`Connecting to Database - ${dbURI}`);
        const connect = await mongoose.connect(dbURI);
        logger.info(
            `Database Connected - @${connect.connection.host}/${connect.connection.name}`
        );
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
};

export default connectDB;
