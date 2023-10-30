import express from 'express'
import {
    registerUserHandler,
    getCurrentUserHandler,
    loginUserHandler,
    refreshAccessTokenHandler
} from '../../../controllers/apps/auth/user.controller'

import { validateRequestBody } from '../../../middlewares/validators'
import { refreshTokenSchema, userLoginSchema, userRegisterSchema } from '../../../utils/validationSchemas/user.validation.schema'
const router = express.Router()

router.post('/register', validateRequestBody(userRegisterSchema), registerUserHandler)
router.post('/login', validateRequestBody(userLoginSchema), loginUserHandler)
router.post('/refresh-token', validateRequestBody(refreshTokenSchema), refreshAccessTokenHandler)
router.get('/', getCurrentUserHandler)

export default router