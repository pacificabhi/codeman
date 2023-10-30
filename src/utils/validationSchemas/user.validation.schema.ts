import Joi from 'joi'
import { IUser } from '../../models/apps/auth/user.model'

const userRegisterSchema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
})

const userLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required()
})

export {
    userRegisterSchema,
    userLoginSchema,
    refreshTokenSchema
}