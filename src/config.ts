import dontenv from 'dotenv'
dontenv.config()

const config = {
    PORT:parseInt(process.env.PORT as string),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT as string),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
}

export default config
