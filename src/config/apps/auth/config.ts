const authConfig = {
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    jwt_access_token_expiry: '5m' as string,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    jwt_refresh_token_expiry: '1d' as string,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
    user_token_expiry: (60 * 60 * 24) as number, // 1 day
    login_rate_limit_window: 1 * 10 * 1000, // 15 seconds
    login_rate_limit_count: 1,
    api_rate_limit_window: 1 * 60 * 1000,
    api_rate_limit_count: 40,
};

export default authConfig;
