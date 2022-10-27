import dontenv from 'dotenv'
dontenv.config()

const config = {
    PORT:parseInt(process.env.PORT as string),
    
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT as string),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,

    JWT_SECRET:process.env.JWT_SECRET as string,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
    JWT_RECOVERY_SECRET:process.env.JWT_RECOVERY_SECRET as string,

    GMAIL_KEY: process.env.GMAIL_KEY,

    DOMAIN_BASE_PATH: process.env.DOMAIN_BASE_PATH,

    PAYPAL_USER_ID: process.env.PAYPAL_USER_ID,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    PAYPAL_API: process.env.PAYPAL_API,
}

export default config
