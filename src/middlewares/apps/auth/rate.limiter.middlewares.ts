import { rateLimit } from 'express-rate-limit';
import authConfig from '../../../config/apps/auth/config';

const loginRateLimit = rateLimit({
    windowMs: authConfig.login_rate_limit_window,
    limit: authConfig.login_rate_limit_count,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

const apiRateLimit = rateLimit({
    windowMs: authConfig.api_rate_limit_window,
    limit: authConfig.api_rate_limit_count,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});

export { loginRateLimit, apiRateLimit };
