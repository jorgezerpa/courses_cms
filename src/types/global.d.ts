export {};

type databaseType = 'mysql'

declare global {    
  namespace Express {
    interface Request {
      imagePath: undefined|string;
      auth: {
        header: { alg: string, typ: string, kid: string },
        token: string,
        payload:{
          iss: string,
          sub: string,
          aud: string[],
          iat: number,
          exp: number,
          azp: string,
          scope: string
        }
      }
    }

    interface User {
      id: string;
      sub: string;
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

        CLOUDINARY_NAME:string
        CLOUDINARY_API_KEY:string
        CLOUDINARY_API_SECRET:string

        AWS_BUCKET_NAME:string
        AWS_BUCKET_REGION:string
        AWS_ACCESS_KEY:string
        AWS_SECRET_ACCESS_KEY:string

    }
  }
}