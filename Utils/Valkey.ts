import {Redis} from "ioredis"
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path:path.join(__dirname , ".." , ".env")
})

const valkey = new Redis({
    username:process.env.VALKEY_USER_NAME as string,
    port:parseInt(process.env.VALKEY_PORT ?? "6379" , 10) as number,
    host:process.env.VALKEY_HOST as string,
    password:process.env.VALKEY_PASSWORD as string,
    connectTimeout:23000,
    commandTimeout:13000
})

export default valkey