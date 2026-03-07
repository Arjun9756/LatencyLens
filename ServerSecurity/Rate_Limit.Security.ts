import valkey from "../Utils/Valkey"
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import {Request , Response , NextFunction} from "express"
dotenv.config({
    path:path.join(__dirname , ".." , '.env')
})

async function rateLimitUser(req:Request, res:Response, next:NextFunction){
    const userIP = req.header('X-forwarded-for')?.split(' ')[0] || req.header('cf-connecting-ip') || req.ip as string
    const rateLimitThresholdValue = process.env.rateLimitThresholdValue
    const key = `rateLimit:${userIP}`

    try{
        const currentRequest = await valkey.incr(key)
        if(currentRequest === 1){
            valkey.expire(key , 60)
        }

        if(currentRequest > parseInt(rateLimitThresholdValue ??  "60" , 10)){
            return res.status(429).json({
                status:false,
                message:"Too Many Requets",
                error:"Rate Limited User"
            })
        }

        next()

    }
    catch(error:any){
        console.log(`Error While Rate Limiting User ${error.message}`)
        fs.writeFile(path.join(__dirname , ".." , ".." , "LogMetrics.txt") , `\n ${new Date().toLocaleDateString('IN')} Error in Rate Limiting User ${error.message}` , (err)=>{})
        return res.status(501).json({
            status:false,
            message:"Valkey Internal Server Error"
        })
    }
}

export default rateLimitUser