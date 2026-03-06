import express from 'express'
import path from 'path'
import rateLimit from '../ServerSecurity/Rate_Limit.Security'

const router = express.Router()
router.get('/' , (req,res)=>{
    return res.status(200).json({
        status:true,
        message:"Request Process By Latency Route GET Request"
    })
})