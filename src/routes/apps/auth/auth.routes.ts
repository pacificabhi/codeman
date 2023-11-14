import express from 'express';
import {
    registerUserHandler,
    getCurrentUserHandler,
    loginUserHandler,
    refreshAccessTokenHandler,
    logoutUserHandler,
} from '../../../controllers/apps/auth/auth.controller';

import { validateRequestBody } from '../../../middlewares/validators';
import {
    refreshTokenSchema,
    userLoginSchema,
    userRegisterSchema,
} from '../../../utils/validationSchemas/user.validation.schema';
import { loginRateLimit } from '../../../middlewares/apps/auth/rate.limiter.middlewares';

const router = express.Router();

router
    .route('/register')
    .post(validateRequestBody(userRegisterSchema), registerUserHandler);

router
    .route('/login')
    .post(
        [validateRequestBody(userLoginSchema), loginRateLimit],
        loginUserHandler
    );

router
    .route('/refresh-token')
    .post(validateRequestBody(refreshTokenSchema), refreshAccessTokenHandler);

router.route('/logout').post(logoutUserHandler);

router.get('/', getCurrentUserHandler);

export default router;
