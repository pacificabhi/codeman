import mongoose, { Schema } from 'mongoose';

export interface IProblem {
    title: string;
    description: string;
}

const problemSchema: Schema = new Schema<IProblem>(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProblem>('Problem', problemSchema);
