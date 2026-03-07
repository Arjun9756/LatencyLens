import { Redis } from 'ioredis'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config({
    path: path.join(__dirname, "..", ".env")
})

const redis = new Redis({
    username: process.env.REDIS_USERNAME as string,
    password: process.env.REDIS_PASSWORD as string,
    port: parseInt(process.env.REDIS_PORT || "6379") as number,
    connectTimeout: 250000,
    commandTimeout: 23000,
    tls: {
        rejectUnauthorized: false
    },
    host: process.env.REDIS_HOST as string
})

/**
 * @name {createRedisObject}
 * @summary {Returns an Redis Object For Pub Sub Model}
 * @returns {object}
 */

function createRedisObject() {
    const redis = new Redis({
        username: process.env.REDIS_USERNAME as string,
        password: process.env.REDIS_PASSWORD as string,
        port: parseInt(process.env.REDIS_PORT || "6379") as number,
        connectTimeout: 250000,
        commandTimeout: 23000,
        tls: {
            rejectUnauthorized: false
        },
        host: process.env.REDIS_HOST as string
    })
}

export default {redis , createRedisObject}