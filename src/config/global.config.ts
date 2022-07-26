import { registerAs } from '@nestjs/config';
export default registerAs('mongo', () => ({
    host: process.env.HOST_MONGODB || 'a',
    user: process.env.USER_MONGODB,
    password: process.env.PASSWORD_MONGODB,
    database: process.env.DATABASE_MONGODB,
    srv: process.env.SRV_MONGODB === 'true' || false,
}))