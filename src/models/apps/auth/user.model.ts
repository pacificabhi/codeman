import mongoose, { Schema } from 'mongoose'

export interface IUser {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    active?: boolean,
    verifiedEmail?: boolean,
    id?: string
    role?: string
}

const userSchema: Schema = new Schema<IUser>(
    {
        username: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Please add the username"],
            unique: true,
            index: true
        },

        firstname: {
            type: String,
            required: [true, "Please add the firstname"],
        },

        lastname: {
            type: String,
            required: [true, "Please add the lastname"],
        },

        email: {
            type: String,
            required: [true, "Please add the user email address"],
            unique: true,
        },

        password: {
            type: String,
            required: [true, "Please add the user password"],
        },

        role: {
            type: String,
            default: "NORMAL",
        },

        active: {
            type: Boolean,
            default: true
        },

        verifiedEmail: {
            type: Boolean,
            default: false
        }

      },
      {
        timestamps: true,
      }
)

export default mongoose.model<IUser>('User', userSchema)