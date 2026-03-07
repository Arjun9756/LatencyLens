import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import { Queue } from 'bullmq'

dotenv.config({
    path:path.join(__dirname , ".." , ".env")
})

const delhiCenterQueue = new Queue("DelhiCenterQueue" , {
    connection:{
        username:process.env.REDIS_USERNAME as string,
        password:process.env.REDIS_PASSWORD as string,
        port:parseInt(process.env.REDIS_PORT || "6379") as number,
        host:process.env.REDIS_HOST as string,
        tls:{
            rejectUnauthorized:false,
        },
        connectTimeout:25000,
        commandTimeout:23000
    }
})

export default delhiCenterQueue