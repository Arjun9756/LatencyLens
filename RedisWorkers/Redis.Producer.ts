import path from 'path'
import Redis from '../Utils/Redis'
import fs from 'fs'
const producer = Redis.createRedisObject()

producer.on('connect' , ()=>{
    console.log("Central Server Producer Connected")
})
producer.on('close' , ()=>{
    console.log('Central Server Producer Closed')
})

async function publishURL(websiteURL:string , UUID:string , userIP:string|undefined){
    try{
        producer.publish("consumeURL" , JSON.stringify({websiteURL , UUID , userIP}))
        console.log("Producer Publish and Item")
    }
    catch(error:any){
        fs.writeFile(path.join(__dirname, ".." , "LogMetrics.txt") , `\n Error in Redis Producer ${error?.message || error}` , {
            encoding:'utf-8'
        },()=>{})
    }
}

export default publishURL