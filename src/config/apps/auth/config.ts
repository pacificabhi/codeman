
const authConfig = {
    jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    jwt_access_token_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRY as string,
    jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    jwt_refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRY as string,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
    user_token_expiry: process.env.USER_TOKEN_EXPIRY as string// 1 day
    
}

export default authConfig