import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import {Worker} from 'bullmq'
dotenv.config({
    path:path.join(__dirname , ".." , ".env")
})

const delhiCenterWorker = new Worker('DelhiCenterQueue' , async (job)=>{
    const {websiteURL} = await job.data
})