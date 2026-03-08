import { Redis } from 'ioredis'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({
    path: path.join(__dirname, "..", ".env")
})

const redisConfig = {
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASSWORD as string,
    port: parseInt(process.env.REDIS_PORT || "6379") as number,
    connectTimeout: 250000,
    commandTimeout: 23000,
    tls: {
        rejectUnauthorized: false
    },
    host: process.env.REDIS_HOST as string
}

/**
 * @name {createRedisObject}
 * @summary {Returns an Redis Object For Pub Sub Model}
 * @returns {object}
 */

const redis = new Redis(redisConfig)
function createRedisObject():Redis{
    return new Redis(redisConfig)
}

export default { redis ,createRedisObject }