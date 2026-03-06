import express from 'express'
import path from "path"
import dotenv from 'dotenv'
import os from 'os'
import fs from 'fs'

dotenv.config({
    path:path.join(__dirname , ".." , ".env")
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.set("trust proxy" , true)

app.get('/' , (req,res,next)=>{
    return res.status(200).json({
        status:true,
        message:`Server is Running on Port ${process.env.SERVER_PORT}`,
        freeMemory:os.freemem,
        platform:os.platform,
        network:os.networkInterfaces()
    })
})

// Browser OPTIONS Request Handle
app.options("/*" , (req,res,next)=>{
    res.setHeader('Access-Control-Allowed-Origin' , "*")
    res.setHeader('Access-Control-Allowed-Methods' , "GET,PUT,PATCH,DELETE,POST,OPTIONS")
    res.setHeader("Access-Control-Allowed-Headers" , "Authorization,Content-Type")
    res.statusCode = 200
})

app.listen(process.env.SERVER_PORT || 8080 , (err)=>{
    if(err){
        fs.writeFile(path.join(__dirname , ".." , "LogMetrics.txt") , `\n ${new Date().toLocaleDateString('IN')} Server Starting Problem ${err?.message || err}` , (err)=>{})   
    }
    console.log(`Central Server is Running on Port ${process.env.SERVER_PORT || 8080}`)
})