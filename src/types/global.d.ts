export {};

type databaseType = 'mysql'

declare global {
  namespace Express {
    interface Request {
      imagePath: undefined|string
    }
    interface User {
      id: number;
      sub: number;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
        PORT:string;
        ENV: 'test' | 'dev' | 'prod';

        DB_HOST: string;
        DB_PORT: string;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_NAME:string

        JWT_SECRET:string
        DOMAIN_BASE_PATH:string

        PAYPAL_USER_ID:string
        PAYPAL_SECRET:string
        PAYPAL_API:string
    }
  }
}