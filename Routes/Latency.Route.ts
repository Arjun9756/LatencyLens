import express from 'express'
import path from 'path'
import rateLimit from '../ServerSecurity/Rate_Limit.Security'
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
        
    return res.statusCode = 200
})

export default router