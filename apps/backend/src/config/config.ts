import { config } from 'dotenv';

config();

const CONSTANTS = {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    ORIGIN: process.env.ORIGIN as string,

    DATABASE_URL: process.env.DATABASE_URL as string,
    REDIS_URL: process.env.REDIS_URL as string,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
    AES_SECRET_KEY: process.env.AES_SECRET_KEY as string,

    JWT_ISSUER: 'poketime.space',
} as const;

export { CONSTANTS };
