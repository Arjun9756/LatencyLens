import express from 'express'
import path from 'path'
import generateUUID from '../Utils/UUID'
import rateLimit from '../ServerSecurity/Rate_Limit.Security'
import publishURL from '../RedisWorkers/Redis.Producer'

const router = express.Router()

function validateWebiste(wesbiteURL:string):boolean{
    const regex = /^https:\/\/www\.[a-zA-Z]+\.(com|in|gov|net)$/
    return regex.test(wesbiteURL)
}

router.get('/' , (req,res)=>{
    return res.status(200).json({
        status:true,
        message:"Request Process By Latency Route GET Request"
    })
})

router.post('/getMonitor' , rateLimit , (req,res)=>{
    const {wesbiteURL} = req.body
    if(!wesbiteURL){
        return res.status(401).json({
            status:false,
            message:"Website Name Must Be Provided"
        })
    }

    let isValid = validateWebiste(wesbiteURL)
    if(!isValid){
        return res.status(401).json({
            status:false,
            message:"Website URL is Not in Correct Format or Incorrect Website URL"
        })
    }
        
    const uuid = generateUUID()
    publishURL(wesbiteURL , uuid , req.ip)

    return res.status(200).json({
        status:true,
        message:"Fetching The Data From Servers Wait For a While!!",
        UUID:uuid
    })
})

export default router