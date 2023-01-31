import dontenv from 'dotenv'
dontenv.config()

const config = {
    PORT:parseInt(process.env.PORT as string),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT as string),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION:process.env.AWS_BUCKET_REGION,
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
}


export default config
