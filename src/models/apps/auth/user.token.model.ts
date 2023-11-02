import mongoose, { Schema } from 'mongoose';
import authConfig from '../../../config/apps/auth/config';

export interface IUserToken {
    userId: Schema.Types.ObjectId;
    token: string;
}

const userTokenSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    token: {
        type: String,
        unique: true,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: authConfig.user_token_expiry,
    },
});

export default mongoose.model<IUserToken>('UserToken', userTokenSchema);
